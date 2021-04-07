const router = require('express').Router()
const { User, Tweet } = require('../models')
const passport = require('passport')
require('dotenv').config();

// Load homepage for specific User
router.get('/home/recent', passport.authenticate("jwt"), async (req, res) => {

    // Unfinished, need to do a deep populate for all users being followed + users most recent tweets
    let user
    try {

        user = await User.findOne({ _id: req.user._id })

    } catch (err) {

        res.json(err)
        return

    }

    res.json({
        user: user
    })

})

// Get one specific tweet
router.get('/tweet/:id', async (req, res) => {

    let tweet

    try {

        tweet = await Tweet.findById(req.params.id)

    } catch (err) {
        res.json(err)
        return
    }

    if (tweet === null) {

        res.json({
            status: 404,
            message: "Tweet not found."
        })

        return

    }

    res.json(tweet)


})

// Algorithm for Home Page
router.get('/featured-tweets/', passport.authenticate("jwt"), async (req, res) => {

    let today = new Date()
    let allTweets = []
    let sortedByTodayTweets = []
    let followingUsersTweets = []
    let allFollowingTweets = []
    let userRecentTweets = []

    const dateSameDay = (firstDate, secondDate) => {
        return firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getDate() === secondDate.getDate()
    }

    const datePastTwoDays = (firstDate, secondDate) => {
        return firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            (firstDate.getDate() - secondDate.getDate()) <= 2
    }

    // for (tweet of req.user.tweets) {

    //     try {

    //         let tweetData = await Tweet.findById(tweet)
    //         if (tweetData) {
    //             allTweets.push(tweetData)
    //         }

    //     } catch (err) {

    //         res.json(err)

    //         return
    //     }

    // }

    // allTweets.sort((a, b) => b.created_at - a.created_at)

    // for (tweet of allTweets) {

    //     if (dateSameDay(today, tweet.created_at)) {
    //         sortedByTodayTweets.unshift(tweet)
    //     } else if (datePastTwoDays(today, tweet.created_at)) {
    //         sortedByTodayTweets.push(tweet)
    //     }

    // }

    for (followingUserID of req.user.following) {

        try {

            let data = await User.findById(followingUserID)
            followingUsersTweets.push(data.tweets)

        } catch (err) {
            res.json(err)

            return
        }

    }

    for (following of followingUsersTweets) {

        for (tweets of following) {

            try {

                let data = await Tweet.findById(tweets).populate({
                    path: 'created_by',
                    model: 'user'
                })

                if (datePastTwoDays(today, data.created_at)) {
                    allFollowingTweets.push(data)
                }

            } catch (err) {
                res.json(err)

                return
            }
        }
    }

    allFollowingTweets.sort((a, b) => b.created_at - a.created_at)

    res.json(allFollowingTweets)


})

// Get Users recent tweets past 2 dats
router.get('/users-recent', passport.authenticate("jwt"), async (req, res) => {
    let tweets = []
    let today = new Date()

    const datePastTwoDays = (firstDate, secondDate) => {
        return firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            (firstDate.getDate() - secondDate.getDate()) <= 1
    }

    for (tweet of req.user.tweets) {

        let data = await Tweet.findById(tweet)
        data.created_by = req.user
        if (datePastTwoDays(today, data.created_at)) {
            tweets.push(data)
        }
    }

    res.json(tweets)

})

router.get('/users-info', passport.authenticate("jwt"), (req, res) => [
    res.json(req.user)
])

module.exports = router



