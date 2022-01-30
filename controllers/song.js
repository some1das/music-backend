const formidable = require("formidable");
const path = require("path")
const fs = require("fs");
const Song = require("../models/song");
const { join } = require("path");

const randomStringGenerator = () => {
    let r = (Math.random() * 1000).toString(36)
    return r;
}

exports.uploadSong = (req, res) => {
    // const bucket = storage.getBucket()
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                message: "problem with image",
            });
        }
        console.log(fields)
        //destructure the fields


        //TODO: restrictions on fields



        if (file.songFile) {
            if (file.songFile.size > 30000000) {
                return res.status(400).json({
                    message: "file is too big!!",
                });
            }

            const nameSong = file.songFile.originalFilename + randomStringGenerator();
            const songFileName = nameSong + path.extname(file.songFile.originalFilename)

            const namePicture = file.pictureFile.originalFilename + randomStringGenerator();
            const pictureFileName = namePicture + path.extname(file.pictureFile.originalFilename)


            app.locals.bucket.file(songFileName).createWriteStream().end(fs.readFileSync(file.songFile.filepath))

            app.locals.bucket.file(pictureFileName).createWriteStream().end(fs.readFileSync(file.pictureFile.filepath))

            var fileRefSong = app.locals.bucket.file(songFileName);
            fileRefSong.exists().then(function (data) {
                console.log("File in database exists ");
            });

            var fileRefPicture = app.locals.bucket.file(pictureFileName);
            fileRefPicture.exists().then(function (data) {
                console.log("File in database exists ");
            });

            // console.log(fileRef)
            const config = {
                action: 'read',
                // A timestamp when this link will expire
                expires: '01-01-2026',
            };
            fileRefSong.getSignedUrl(config, async (err, urlSong) => {
                if (err) {
                    console.log(err)
                    return res.status(404).json({
                        error: "not exist"
                    })
                }
                else {
                    fileRefPicture.getSignedUrl(config, async (err, urlPic) => {

                        if (err) {
                            console.log(err)
                            return res.status(404).json({
                                error: "not exist"
                            })
                        }
                        else {
                            const song = new Song({
                                songLink: urlSong,
                                pictureLink: urlPic,
                                title: fields.title,
                                year: fields.year,
                                language: fields.language,
                                singer: fields.singer,
                                songFileName: songFileName,
                                pictureFileName: pictureFileName
                            })
                            song.save((err, data) => {
                                if (err) {
                                    console.log(err)

                                    return res.status(500).json({
                                        error: true,
                                        message: "something went wrong while saving data to the database",

                                    })
                                }
                                else {
                                    return res.status(200).json({
                                        error: false,
                                        message: "song saved successfully"
                                    })
                                }
                            })
                        }
                    })


                }
            });
        }
    })
}

exports.getSongs = (req, res) => {
    Song.find((err, songs) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: "unable to fetch songs"
            })
        }
        else {
            return res.status(200).json({
                error: false,
                songs: songs
            })
        }
    })
}