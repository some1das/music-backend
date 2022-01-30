const express = require("express")
const { uploadSong, getSongs } = require("../controllers/song")
const router = express.Router()

router.post("/upload", uploadSong)
router.get("/allSongs", getSongs)

module.exports = router