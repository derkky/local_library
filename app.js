// Linking to database
const mongoose = require("mongoose")
const mongoDB = process.env.MONGODB_URI 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"))

const express = require("express")
const app = express()
const path = require("path")

// Other middleware to parse requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Allowing client to access API
const cors = require("cors")
app.use(cors({
    origin: "*"
}))

// Compression
const compression = require("compression")
app.use(compression())
app.use(express.static(path.join(__dirname, "public")))

// Setting up routes
const author = require("./routes/author")
const book = require("./routes/book")
const bookinstance = require("./routes/bookinstance")
const genre = require("./routes/genre")

app.use("/api/author", author)
app.use("/api/book", book)
app.use("/api/bookinstance", bookinstance)
app.use("/api/genre", genre)

// Helmet protection
const helmet = require("helmet")
app.use(helmet())

// Client
app.use(express.static(path.resolve(__dirname, "./client/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})