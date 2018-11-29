const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            minlength:3,
            maxlength:16
        },
        group:{
            type:String,
            required:true,
            default:"user",
            enum:['user', 'admin']
        },
        password:{
            type:String,
            minlength:4,
            maxlength:16,
        },
    }
)

module.exports = mongoose.model("User", user)