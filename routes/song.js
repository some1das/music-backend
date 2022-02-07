const express = require("express")
const { uploadSong, getSongs, likeSong, getLikedSongsIds, unlikeSong, getLikedSongsOfUser } = require("../controllers/song")
const router = express.Router()

router.post("/upload", uploadSong)
router.get("/allSongs", getSongs)
router.post("/like", likeSong)
router.post("/getLikedSongs", getLikedSongsIds)
router.post("/unlike", unlikeSong)
router.post("/getLikedSongsFull", getLikedSongsOfUser)

module.exports = router