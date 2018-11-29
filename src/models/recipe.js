const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipe = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            minlength:3,
            maxlength:16
        },
        ingreds:{
            type: [{
                name: {
                    type: String,
                    require:true,
                },
                count: {
                    type: Number,
                    require:true,
                },
            }],
            default:[],
            required:true
        }
    }
)

module.exports = mongoose.model("Recipe", recipe)