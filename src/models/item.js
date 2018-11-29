const mongoose = require('mongoose')
const Schema = mongoose.Schema

const item = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            minlength:3,
            maxlength:16
        },
        count:{
            type:Number,
            default:0,
            min:0,
            max:1000,
        },
    }
)

module.exports = mongoose.model("Item", item)