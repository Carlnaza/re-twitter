const { model, Schema } = require('mongoose')

const VerifiedEmailSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expireAfterSeconds: 30}
});

module.exports = model('verifiedEmail', VerifiedEmailSchema)