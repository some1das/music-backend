const AdminPlayList = require("../models/adminPlayList");
exports.createAdminPlayList = async (req, res) => {
  const { playListName, songs } = req.body;
  const newPlayList = new AdminPlayList({
    playListName: playListName,
    songs: songs,
  });
  try {
    const playListData = await newPlayList.save();

    return res.status(200).json({
      error: false,
      playListData,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err,
    });
  }
};

exports.getAllAdminPlayList = async (req, res) => {
  try {
    const allLists = await AdminPlayList.find();
    return res.status(200).json({
      error: false,
      allLists,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err,
    });
  }
};

exports.getSongsInAdminAPlayList = (req, res) => {
  AdminPlayList.findById(req.playListId)
    .populate("songs")
    .exec((err, playList) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Something went wrong !",
        });
      }
      return res.status(200).json({
        error: false,
        playList,
      });
    });
};

// params functions
exports.getSongsByPlayListIdParam = (req, res, next, id) => {
  req.playListId = id;
  next();
};

exports.updateAdminPlayList = (req, res) => {
  console.log(req.params);
  AdminPlayList.findById(req.params.adminPlayListId, (err, playList) => {
    if (err) {
      return res.status(400).json({ error: true });
    }
    if (playList == null) return res.status(404).json({ error: true });
    playList.playListName = req.body.playListName;
    playList.songs = req.body.songs;
    playList.save((err, newPlayList) => {
      if (err) {
        return res.status(400).json({ error: true, message: err.message });
      }
      return res.status(200).json({ error: false, newPlayList });
    });
  });
  //   return res.status(200).json({ message: "hello" });
};

//Deleting admin created playList
exports.deleteAdminPlayList = (req, res) => {
  const playlistId = req.params.adminPlaylistId;

  AdminPlayList.deleteOne({ _id: playlistId }, (err, data) => {
    console.log(data);
    //Handling no playlist exist case
    if (data.deletedCount == 0)
      return res.status(404).json({
        error: true,
        message: "Playlist doesn't exist",
      });
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Unable to delete the playlist",
      });
    }
    return res.status(200).json({
      error: false,
      message: "deleted successfully",
    });
  });
};
