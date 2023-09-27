const express= require('express');

const booksRouter = require('./routes/books.route')
const authersRouter = require('./routes/authers.route')
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/bookStoreDB')
    .then(()=>console.log("Connected to MongoDB... "))
    .catch((error)=>console.log("Connection Failed to MongoDB !",error.reason))



// Init The App
const app = express();

//apply middlewares
app.use(express.json());

// Mount Routes
app.use('/api/books',booksRouter)
app.use('/api/authers',authersRouter)


//Running The Server
const port = 4000
 app.listen(port,(req,res)=>{
console.log(`server is working on port ${port}`);
 })