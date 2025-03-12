const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    profileImage: { type: String },
    address: { type: String },
    phone: { type: String }
});

module.exports = mongoose.model('Profile', ProfileSchema);
