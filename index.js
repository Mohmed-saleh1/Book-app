const express= require('express');
const logger = require('./middlewares/logger.js')
const {notFound,errorHandler} = require('./middlewares/errors')
const dbConnection=require('./config/dbConnection')
      require('dotenv').config()

 
// Database Connection
dbConnection()
// Init The App
const app = express();

//apply middlewares
app.set('views engin','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(logger)

// Mount Routes
app.use('/api/books',  require('./routes/books'))
app.use('/api/authers',require('./routes/authers'))
app.use('/api/auth',   require ('./routes/auth'))
app.use('/api/users',  require ('./routes/users'))

app.use(notFound)
app.use(errorHandler)

//Running The Server
const port = process.env.PORT
 app.listen(port,()=>{
console.log(`server is working IN ${process.env.NODE_ENV} on port ${port}`);
 })