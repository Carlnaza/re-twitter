const router = require('express').Router()
const { User, Tweet } = require('../models')
const passport = require('passport')
require('dotenv').config();

// Load homepage for specific User
router.get('/home/recent', passport.authenticate("jwt"), async (req, res) => {

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

    } else {

        res.json(tweet)

    }

})

module.exports = router