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

    try {

        let user = await User.register(new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            username: lowCaseUName
        }), req.body.password)

        res.sendStatus(200).json({ user: user, message: "User successfully created" })

    } catch (err) {

        res.json(err)

        return

    }

})

// Create a new Tweet
router.post('/users/tweet', async (req, res) => {

    try {

        let tweet = await Tweet.create(req.body)
        res.sendStatus(200).json({
            tweet: tweet,
            message: "Tweet successfully created"
         })

    } catch (err) {

        res.json(err)

        return
    }

})

module.exports = router