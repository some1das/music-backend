const User = require("../models/user")

exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        return res.status(200).json({
            error: false,
            users: users
        })
    }
    catch (err) {
        return res.status(404).json({
            error: true,
            message: "Something went wrong"
        })
    }
}