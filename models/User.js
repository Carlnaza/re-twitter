const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
     },
    username: {
       type: String,
       unique: true, 
       required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true
    },
    verified: Boolean,
    tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'tweet'
    }],
    pinned_tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'tweet'
    }],
    liked_tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'tweet'
    }],
    re_tweets: [{
        type: Schema.Types.ObjectId,
        ref: 'tweet'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    createdAt: { type: Date, default: Date.now }
})

UserSchema.plugin(require('passport-local-mongoose'))

module.exports = model('user', UserSchema)