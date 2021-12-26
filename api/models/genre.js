const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GenreSchema = new Schema(
    {
        name: {type: String, required: true, minLength: 3, maxlength: 100}
    },
    {
        toJSON: {virtuals: true}
    }
)

GenreSchema.virtual("url").get(function() {
    return "/genre/" + this._id
})

module.exports = mongoose.model("Genre", GenreSchema)