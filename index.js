const express= require('express');

const booksRouter = require('./routes/books.route')
const authersRouter = require('./routes/authers.route')
const logger = require('./middlewares/logger.js')
const {notFound,errorHandler} = require('./middlewares/errors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
 
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to MongoDB... "))
    .catch((error)=>console.log("Connection Failed to MongoDB !",error.reason))



// Init The App
const app = express();

//apply middlewares
app.use(express.json());
app.use(logger)

// Mount Routes
app.use('/api/books',booksRouter)
app.use('/api/authers',authersRouter)
app.use(notFound)
app.use(errorHandler)

//Running The Server
const port = process.env.PORT
 app.listen(port,(req,res)=>{
console.log(`server is working IN ${process.env.NODE_ENV} on port ${port}`);
 })