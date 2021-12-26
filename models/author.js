const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    },
    {
        toJSON: {virtuals: true}
    }
)

AuthorSchema.virtual("name").get(function() {
    var full_name = ""
    if (this.first_name && this.family_name){
        full_name = this.first_name + " " + this.family_name
    } 
    if (!this.first_name || !this.family_name){
        full_name = ""
    }
    return full_name
})

AuthorSchema.virtual("lifespan").get(function() {
    var life_string = ""
    if (this.date_of_birth){
        life_string += this.date_of_birth
    }
    if (this.date_of_death){
        life_string += this.date_of_death
    }
    return life_string
})

AuthorSchema.virtual("url").get(function() {
    return "/author/" + this._id
})

module.exports = mongoose.model("Author", AuthorSchema)