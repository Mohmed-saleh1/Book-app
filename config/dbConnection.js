const mongoose = require('mongoose')
function dbConnection() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB... ")
    } catch (error) {
        console.log("Connection Failed to MongoDB !",error.reason)
    }
}
module.exports=dbConnection
