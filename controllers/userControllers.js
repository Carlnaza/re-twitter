const { User, Tweet, VerifiedEmail } = require('../models')
const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { getgroups } = require('process')
require('dotenv').config();

// Login Route - Creates a session
router.post('/users/login', async (req, res) => {

    let errors = {}
    let lowCaseUName = req.body.username.toLowerCase()
    let data = await User.authenticate()(lowCaseUName, req.body.password)

    if (!data.user) {
        if (data.error.name.includes("Username")) {
            errors.loginUsername = "Incorrect username."
        } else {
            errors.loginPassword = "Incorrect password."
        }
    }

    if (Object.keys(errors).length !== 0) {

        res.json({ status: 400, data: errors })

        return
    }

    res.json({
        status: 200,
        message: `Successfully logged in ${data.user.username}`,
        token: jwt.sign({ id: data.user._id }, process.env.SECRET)
    })
})


// Registration Route
router.post('/users/register', async (req, res) => {

    let errors = {}
    let user
    let lowCaseUName = req.body.username.toLowerCase()
    let nonViaChars = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)

    // Check if any of the inputs are empty
    if (!req.body.username) {
        errors.username = "A username is required to register."
    } else if (nonViaChars.test(req.body.username)) {
        errors.username = "Usernames cannot have special characters and spaces, please enter a new one."
    }
    if (!req.body.name) {
        errors.name = "Please enter a valid name"
    }
    if (!req.body.phone || req.body.phone.length < 10) {
        errors.phone = "Please enter a valid 10 digit phone number"
    }
    if (!req.body.email) {
        errors.email = "An Email is required to register."
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(req.body.email)) {
        errors.email = "Please enter a valid email address."
    }
    if (!req.body.password) {
        errors.password = "Password is required"
    } else if (req.body.password.length < 6) {
        errors.password = "Password must be 6 characters or more."
    }
    if (!req.body.password2) {
        errors.password2 = "Please repeat password."
    } else if (req.body.password2 !== req.body.password) {
        errors.password2 = "Password does not match."
    }
    if (!req.body.year) {
        errors.year = "Birth Date is required to register."
    } else if (new Date().getFullYear() - req.body.year < 13) {
        errors.year = "You must be 13 years or older to register on this site."
    }

    // Stop route here if there are any empty inputs
    if (Object.keys(errors).length !== 0) {

        res.json({ status: 400, data: errors })

        return
    }



    try {

        user = await User.register(new User({
            isAdmin: false,
            verified: false,
            username: lowCaseUName,
            name: req.body.name,
            email: req.body.email,
            date_of_birth: req.body.date_of_birth,
            phone: req.body.phone,
            languages: "English",
        }), req.body.password)

    } catch (err) {

        if (err.message.includes("username")) {
            errors.username = err.message
        }
        if (err.message.includes("email")) {
            errors.email = "A user with the given email is already registered."
        }
        if (err.message.includes("phone")) {
            errors.phone = "This phone number is already attached to a registered account."
        }

        if (Object.keys(errors).length !== 0) {

            res.json({ status: 400, data: errors })

            return

        }

        res.json(err)


    }


    if (user) {
        console.log("User success")

        // Create a verification token for this user
        var token = await new VerifiedEmail({
            userId: user._id,
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

        let url = process.env.WHERE_EVER_WE_HOST_THIS_FROM || 'http://localhost:3000/verify/'
        // email message content
        var mailOptions = {
            to: user.email, subject: 'Account Verification Token', text: `Hello, ${user.name}.  Welcome to re-twitter.  You are just one step away from joining the re-twitter universe.  Just click the link below and enter your password again.\n
        \n
        ${url}${token.token}\n
        \n`

        }

        transporter.sendMail(mailOptions, (err, response) => {

            if (err) throw err;

            res.json({
                status: 200,
                message: `Email has been sent to ${user.name} at ${user.email}`
            })
        })



    }
})

// confirm email 
router.put('/user/verify', (req, res) => {
    console.log(req.body.token)
    VerifiedEmail.findOne({ token: req.body.token }, function (err, token) {
        console.log(token)
        // No token found
        if (!token) return res.json({ status: 400, type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' })
        // If we found a token, find a matching user
        User.findById(token.userId, function (err, user) {
            // message if user can't be found
            if (!user) return res.json({ status: 400, msg: 'We were unable to find a user for this token.' })
            // message if this email ass already been verified
            if (user.isVerified) return res.json({ status: 400, type: 'already-verified', msg: 'This user has already been verified.' })

            // Verify and save the user
            user.isVerified = true
            user.save(function (err) {
                if (err) { return res.json({ status: 500, msg: err.message }); }
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