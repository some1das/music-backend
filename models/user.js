const mongoose = require("mongoose")
const ObjectId = require("mongoose").Schema.Types.ObjectId
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    likedSongs: [
        {
            type: ObjectId, ref: 'Song'
        }
    ],
    role: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model("User", userSchema);