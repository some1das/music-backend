const mongoose = require("mongoose")
const ObjectId = require("mongoose").Schema.Types.ObjectId

const adminPlayListSchema = mongoose.Schema({
    playListName: {
        type: String,
        trim: true
    },
    songs: [
        {
            type: ObjectId,
            ref: "Song"
        }
    ]

})

module.exports = mongoose.model('AdminPlayList', adminPlayListSchema);