const router = require('express').Router()

router.use('/api', require('./userControllers.js'))
router.use('/api', require('./tweetControllers.js'))

module.exports = router