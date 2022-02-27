const express = require("express")
const { createAdminPlayList, getAllAdminPlayList, getSongsByPlayListIdParam, getSongsInAdminAPlayList } = require("../controllers/adminPlayList")
const { isSignedIn } = require("../controllers/auth")
const { getUserByIdParam } = require("../controllers/auth")
const router = express.Router()

router.param("userId", getUserByIdParam)
router.param("adminPlayListId", getSongsByPlayListIdParam)

router.post("/create/:userId", isSignedIn, createAdminPlayList)
router.get("/all/:userId", isSignedIn, getAllAdminPlayList)
router.get("/songs/:userId/:adminPlayListId", isSignedIn, getSongsInAdminAPlayList)

module.exports = router