const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    isAdmin: Boolean,
    name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true,
        trim: true
    },
    gender: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        unique: true,
        trim: true
    },
    isVerified: { type: Boolean, default: false },
    country: String,
    languages: String,
    verified: Boolean,
    profile_img: String,
    cover_photo: String,
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