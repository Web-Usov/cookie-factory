const mongoose = require('mongoose')
const {MONGO_URL} = require('./config')

module.exports = () => {
    return new Promise((resolve,reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connection
            .on('error', error => reject(error))
            .on('close',() => console.log("Database connection closed."))
            .once('open', () => resolve(mongoose.connections[0]));
        mongoose.connect(MONGO_URL,{useNewUrlParser:true})
    })
}