const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()
const cors = require("cors")


app = express();
app.use(bodyParser.json())
app.use(cors())

//routes are imported here
const authRoutes = require("./routes/auth")
const songRoutes = require("./routes/song");
const userRoutes = require("./routes/user")
const { getBucket } = require("./storage_initialize");
//Hello world
//MongoDB database connection
let port = process.env.PORT
mongoose.connect(process.env.DB_STRING, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("DB connected!!")
    }
})
//initialization for firebase storage
app.locals.bucket = getBucket()

//Routing is happening here
app.get("/", (req, res) => {
    return res.status(200).send("<input />")
})
app.use("/auth", authRoutes)
app.use("/song", songRoutes)
app.use("/user", userRoutes)

app.listen(port, () => {
    console.log("Server has been started...")
})