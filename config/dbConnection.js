const mongoose = require('mongoose')
async function dbConnection() {
    try {
       await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB... ")
    } catch (error) {
        console.log("Connection Failed to MongoDB !",error.reason)
    }
}
module.exports=dbConnection
