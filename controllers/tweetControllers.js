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

    // let now = new Date()

    // console.log(now.toDateString())
    // console.log(now.getHours())

    // let dateTweetMade
    // let peopleFollowed = []
    // let usersTweetsToday = []

    // let myTweetsArr = []
    // let usersFollowed = []
    // // Tweets that are within 3 hours
    // let sortedTweets = []

    // let algoResult = {
    //     allTweets: myTweetsArr,
    //     allUsersFollowed: usersFollowed
    // }

    // try {

    //     for (tweet of req.user.tweets) {

    //         let tweetInfo = await Tweet.findById(tweet)
    //         if (tweetInfo.created_at.toDateString())

    //         myTweetsArr.push()

    //     }

    //     for (following of req.user.following) {
    //         usersFollowed.push(await User.findById(following))
    //     }

    //     for (let i = 0; i < myTweetsArr; i++) {

    //     }



    // } catch (err) {
    //     res.json(err)

    //     return
    // }

    // res.json(algoResult)


})

module.exports = router