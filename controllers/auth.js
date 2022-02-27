const User = require("../models/user")
const dotenv = require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken")

const verifyRequest = async (token, email) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // console.log(payload)
    return email == payload.email

}



exports.signInSignUpHelper = (req, res) => {
    // console.log(req.body)
    const { name, email, profilePic, idToken } = req.body
    User.findOne({ email: email }, (err, details) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: "something went wrong 1"
            })
        }
        if (details == null) {
            // console.log(idToken)
            //this means the user is new to the application
            if (verifyRequest(idToken, email)) {

                const user = new User({
                    name: name,
                    email: email,
                    profilePic: profilePic,

                })

                user.save((err, newUser) => {
                    if (err) {
                        return res.status(400).json({
                            error: true,
                            message: "Something went wrong"
                        })
                    }
                    const token = jwt.sign({
                        email: email,
                        _id: newUser._id
                    }, process.env.CLIENT_ID)
                    return res.status(200).json({
                        name: name,
                        email: email,
                        profilePic: profilePic,
                        _id: newUser._id,
                        token: token,
                        existingUser: false,
                        role: newUser.role
                    })
                })
            }
            else {

                return res.status(403).json({
                    error: true,
                    message: "access denied"
                })
            }

        }
        else {
            if (verifyRequest(idToken, email)) {

                const token = jwt.sign({
                    email: email,
                    _id: details._id
                }, process.env.CLIENT_ID)
                return res.status(200).json({
                    name: name,
                    email: email,
                    profilePic: profilePic,
                    _id: details._id,
                    token: token,
                    existingUser: true,
                    role: details.role
                })
            }
            else {

                return res.status(403).json({
                    error: true,
                    message: "access denied"
                })
            }
        }
    })
}

// auth middlewears ----------------

exports.isSignedIn = async (req, res, next) => {
    console.log(req.headers)
    jwt.verify(req.headers.token, process.env.CLIENT_ID, function (err, decoded) {
        if (err) {
            return res.status(500).json({
                message: "Access denied ( invalid token )",
                error: false
            })
        }
        // console.log(decoded) // bar
        req.auth = decoded
        if (req.profile._id == req.auth._id)
            next()
        else
            return res.status(400).json({
                error: true,
                message: "token miss matched"
            })
    });

}


// All auth params are here

exports.getUserByIdParam = async (req, res, next, id) => {
    try {

        const userData = await User.findById(id);
        if (userData == null) {
            return res.status(500).json({
                error: true,
                message: "No user found"
            })
        }
        req.profile = userData;
        next();


    }
    catch (err) {
        return res.status(500).json({
            error: true,
            message: "No user found"
        })
    }
}