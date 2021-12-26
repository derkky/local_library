const mongoose = require("mongoose")
const Schema = mongoose.Schema
const BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: "Book", required: true},
        imprint: {type: String, required: true},
        status: {type: String, enum: ["Available", "Maintenance", "Loaned"]},
        due_back: {type: String, default: Date.now}     
    },
    {
        toJSON: {virtuals: true}
    }
)

BookInstanceSchema.virtual("url").get(function() {
    return "/bookinstance/" + this._id
})

module.exports = mongoose.model("BookInstance", BookInstanceSchema)