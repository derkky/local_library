// Linking to database
const mongoose = require("mongoose")
const dev_db_url = "mongodb+srv://admin:Password@cluster0.lwun6.mongodb.net/local-library?retryWrites=true&w=majority"
const mongoDB = process.env.MONGODB_URI || dev_db_url
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

app.use("/author", author)
app.use("/book", book)
app.use("/bookinstance", bookinstance)
app.use("/genre", genre)

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