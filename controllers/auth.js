const User = require("../models/user")
const dotenv = require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
                    return res.status(200).json({
                        name: name,
                        email: email,
                        profilePic: profilePic,
                        _id: newUser._id,
                        token: idToken,
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

                return res.status(200).json({
                    name: name,
                    email: email,
                    profilePic: profilePic,
                    _id: details._id,
                    token: idToken,
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