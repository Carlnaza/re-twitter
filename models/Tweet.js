const { model, Schema } = require('mongoose')

const TweetSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'tweet'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    retweets: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    created_at: { type: Date, default: Date.now }
})

module.exports = model('tweet', TweetSchema)