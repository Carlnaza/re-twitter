const { User, Tweet, VerifiedEmail } = require('../models')
const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
require('dotenv').config();

// Login Route - Creates a session
router.post('/users/login', (req, res) => {

    let lowCaseUName = req.body.username.toLowerCase()

    User.authenticate()(lowCaseUName, req.body.password, (err, user) => {
        if (err) { res.json(err) }
        // check if account has been verified
        if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });

        res.json({
            message: `Successfully logged in ${user.username}`,
            token: jwt.sign({ id: user._id }, process.env.SECRET)
        })
    })
})


// Registration Route
router.post('/users/register', async (req, res) => {

    let user
    let lowCaseUName = req.body.username.toLowerCase()

    try {

        user = await User.register(new User({
            isAdmin: false,
            verified: false,
            name: req.body.name,
            date_of_birth: req.body.date_of_birth,
            phone: req.body.phone,
            gender: req.body.gender,
            email: req.body.email,
            username: lowCaseUName,
            languages: req.body.languages,
            profile_img: req.body.profile_img,
            cover_photo: req.body.profile_photo
        }), req.body.password)

    } catch (err) {

        res.json(err)

        return

    }
    // Create a verification token for this user
    var token = await new VerifiedEmail({
        id: user._id,
        token: crypto.randomBytes(16).toString('hex')
    })

    // Save the verification token
    token.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
    })

    // generate email to verify email

    let transporter = nodemailer.createTransport({
        // set up email sender account
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    let url = process.env.WHEREEVER_WE_HOST_THIS_FROM || 'http://localhost:3000/emailconfirm/'
    // email message content
    var mailOptions = {
        to: user.email, subject: 'Account Verification Token', text: `Hello, ${user.name}.  Welcome to re-twitter.  You are just one step away from joining the re-twitter universe.  Just click the link below and enter your password again.\n
    \n
    ${url}${token.token}\n
    \n`

    }

    await transporter.sendMail(mailOptions, (err, response) => {
        if (err) throw err;
        res.json({ message: `Email has been sent to ${user.name} at ${user.email}` })
    })


    
})

// confirm email 
router.get('/users/emailconfirm/:token', async (req, res) => {
    VerifiedEmail.findOne({ token: req.params.token }, function (err, token) {
        // No token found
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' })
        // If we found a token, find a matching user
        User.findOne({ email: req.body.email }, function (err, user) {
            // message if user can't be found
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' })
            // message if this email ass already been verified
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' })
            
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                // Confirm success
                res.json({
                    status: 200,
                    user_id: user._id,
                    message: "The account has been verified.Please log in."
                })
            })
        })
    })
})

// Get all of User's Data to display in Settings Page
router.get('/user', passport.authenticate("jwt"), (req, res) => {
    res.json(req.user)
})

// Follow and Unfollow Users
router.put('/users/follow', passport.authenticate("jwt"), async (req, res) => {

    // Checks if USER being followed EXISTS
    let userFollowAttempt
    try {

        userFollowAttempt = await User.findById(req.body.follow_user_id)

    } catch (err) {

        res.json({
            messsage: "Invalid User Id, please try again."
        })

        return
    }

    // Checks if User ID exists in database, if null -> error out
    if (userFollowAttempt === null) {

        res.json({
            code: 404,
            status: "User not found"
        })

        return

    } else {

        // If User ID exists -> Continue with follow/unfollow procedure
        try {

            if (req.body.type === "follow") {
                await User.findByIdAndUpdate(req.user._id, { $addToSet: { following: req.body.follow_user_id } })
                await User.findByIdAndUpdate(req.body.follow_user_id, { $addToSet: { followers: req.user._id } })
            } else if (req.body.type === "unfollow") {
                await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.body.follow_user_id } })
                await User.findByIdAndUpdate(req.body.follow_user_id, { $pull: { followers: req.user._id } })
            }

        } catch (err) {

            res.json(err)
            return

        }

    }

    res.json({
        status: 200,
        successfully: `Successfully ${req.body.type}ed`
    })

})

// <---------- Interacting with Tweets ---------->

// Create a new Tweet
router.post('/users/tweet', passport.authenticate("jwt"), async (req, res) => {

    let tweet
    let tweetObj = {
        message: req.body.message,
        created_by: req.user._id
    }
    // length can be limited on front end using max length 280 on input 
    if (req.body.message.length > 280) {
        res.json({
            message: `Tweet must be 280 characters or less. (Currently: ${req.body.message.length})`
        })

        return
    }

    try {


        // Creates the tweet
        tweet = await Tweet.create(tweetObj)

        // If there are images
        if (req.body.images) {
            await Tweet.findByIdAndUpdate(tweet._id, { $push: { images: { $each: req.body.images } } })
        }

        // Add's Tweet _id to User who created
        await User.findByIdAndUpdate(req.user._id, { $push: { tweets: tweet._id } })

    } catch (err) {

        res.json(err)

        return
    }

    // When successful, send JSON
    res.json({
        status: 200,
        message: "Tweet successfully created"
    })

})

// Interacting with a tweet
router.put('/tweets/interactions', passport.authenticate("jwt"), async (req, res) => {

    try {

        if (req.body.type === 'retweet') {
            await Tweet.findByIdAndUpdate(req.body.tweet_id, { $addToSet: { retweeted_by: req.body.user_id } }, { "new": true })
            await User.findByIdAndUpdate(req.body.user_id, { $addToSet: { re_tweets: req.body.tweet_id } }, { "new": true })
        }
        if (req.body.type === 'un-retweet') {
            await Tweet.findByIdAndUpdate(req.body.tweet_id, { $pull: { retweeted_by: req.body.user_id } }, { "new": true })
            await User.findByIdAndUpdate(req.body.user_id, { $pull: { re_tweets: req.body.tweet_id } }, { "new": true })
        }
        if (req.body.type === 'like') {
            await Tweet.findByIdAndUpdate(req.body.tweet_id, { $addToSet: { liked_by: req.body.user_id } }, { "new": true })
            await User.findByIdAndUpdate(req.body.user_id, { $addToSet: { liked_tweets: req.body.tweet_id } }, { "new": true })
        }
        if (req.body.type === 'un-like') {
            await Tweet.findByIdAndUpdate(req.body.tweet_id, { $pull: { liked_by: req.body.user_id } }, { "new": true })
            await User.findByIdAndUpdate(req.body.user_id, { $pull: { liked_tweets: req.body.tweet_id } }, { "new": true })
        }

    } catch (err) {

        res.send(err)

        return
    }

    // If successfully added send 200
    res.json({
        status: 200,
        message: `Successfully ${req.body.type}ed`
    })

})

// Deleting a tweet
router.delete('/tweets/delete', passport.authenticate("jwt"), async (req, res) => {

    try {

        await Tweet.findByIdAndDelete(req.body.tweet_id)

    } catch (err) {

        res.json(err)

        return
    }

    // If successfully deleted send 200
    res.json({
        status: 200,
        message: "Successfully deleted tweet"
    })

})

module.exports = router