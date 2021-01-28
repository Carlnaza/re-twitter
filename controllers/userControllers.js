const { User, Tweet } = require('../models')
const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('dotenv').config();

let loginFailedCounter = 0;
// Login Route - Creates a session
router.post('/users/login', (req, res) => {
    let lowCaseUName = req.body.username.toLowerCase()
    User.authenticate()(lowCaseUName, req.body.password, (err, user) => {
        if (err) res.json(err)
        if (!user && loginFailedCounter < 3) {
            loginFailedCounter++;
            res.json({ name: "LoginFailedError", message: "Login failed, please try again.", isLoggedIn: false })
        }
        if (!user && loginFailedCounter >= 3) {
            loginFailedCounter++;
            res.json({ name: "MultipleFailedError", message: "Login failed, please reset your password.", isLoggedIn: false })
        }
        if (user) {
            loginFailedCounter = 0;
            res.json({
                isLoggedIn: !!user,
                user: user,
                token: jwt.sign({ id: user._id }, process.env.SECRET)
            })
        }
    })
})

// Registration Route
router.post('/users/register', async (req, res) => {

    let lowCaseUName = req.body.username.toLowerCase()

    let user
    try {

        user = await User.register(new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            username: lowCaseUName
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

// Create a new Tweet
router.post('/users/tweet', async (req, res) => {

    let tweet
    try {

        // Creates the tweet
        tweet = await Tweet.create(req.body)
        // Add's Tweet _id to User who created
        await User.findByIdAndUpdate(req.body.created_by, { $push: { tweets: tweet._id } })

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
router.put('/tweets/interactions', async (req, res) => {

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

    // If successfuly added send 200
    res.json({
        status: 200,
        message: `Successfully ${req.body.type}ed`
    })

})

// Deleting a tweet
router.delete('/tweets/delete', async (req, res) => {

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