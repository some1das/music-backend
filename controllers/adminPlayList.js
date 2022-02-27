const AdminPlayList = require("../models/adminPlayList")
exports.createAdminPlayList = async (req, res) => {
    const { playListName, songs } = req.body;
    const newPlayList = new AdminPlayList({
        playListName: playListName,
        songs: songs
    })
    try {
        const playListData = await newPlayList.save();

        return res.status(200).json({
            error: false,
            playListData
        })
    }
    catch (err) {
        return res.status(400).json({
            error: true,
            message: err
        })
    }
}

exports.getAllAdminPlayList = async (req, res) => {
    try {

        const allLists = await AdminPlayList.find();
        return res.status(200).json({
            error: false,
            allLists
        })

    }
    catch (err) {
        return res.status(400).json({
            error: true,
            message: err
        })
    }
}

exports.getSongsInAdminAPlayList = (req, res) => {
    AdminPlayList.findById(req.playListId).populate('songs').exec((err, playList) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: "Something went wrong !"
            })
        }
        return res.status(200).json({
            error: false,
            playList
        })
    })
}

// params functions
exports.getSongsByPlayListIdParam = (req, res, next, id) => {
    req.playListId = id;
    next()
}





