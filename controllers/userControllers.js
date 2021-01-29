const { User, Tweet } = require('../models')
const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config();

// Login Route - Creates a session
router.post('/users/login', (req, res) => {

    let lowCaseUName = req.body.username.toLowerCase()

    User.authenticate()(lowCaseUName, req.body.password, (err, user) => {
        if (err) { res.json(err) }

        res.json({
            isLoggedIn: !!user,
            user: user,
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

    res.json({
        status: 200,
        user_id: user._id,
        message: "User successfully created"
    })

})

// Get all of User's Data to display in Settings Page
router.get('/user', passport.authenticate("jwt"), (req, res) => {
    res.json(req.user)
})

// Follow and Unfollow Users
router.put('/users/follow', passport.authenticate("jwt"), async (req, res) => {

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