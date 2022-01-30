const mongoose = require("mongoose")
const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    singer: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    songLink: {
        type: String,

    },
    pictureLink: {
        type: String,
    },
    songFileName: {
        type: String,
    },
    pictureFileName: {
        type: String
    },
    year: {
        type: String
    }
})

module.exports = mongoose.model("Song", songSchema)