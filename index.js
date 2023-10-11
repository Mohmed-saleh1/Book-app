const express= require('express');
const logger = require('./middlewares/logger.js')
const {notFound,errorHandler} = require('./middlewares/errors')
const dbConnection=require('./config/dbConnection')
const path= require('path')
      require('dotenv').config()

// Database Connection
dbConnection()
// Init The App
const app = express();

// static folder 
app.use(express.static(path.join(__dirname,"images")));

//apply middlewares
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(logger)

// Mount Routes
app.use('/api/books',  require('./routes/books'))
app.use('/api/authers',require('./routes/authers'))
app.use('/api/auth',   require ('./routes/auth'))
app.use('/api/users',  require ('./routes/users'))
app.use('/api/upload',  require ('./routes/upload'))
app.use('/',  require ('./routes/resete-password'))

// Error Handling
app.use(notFound)
app.use(errorHandler)

//Running The Server
const port = process.env.PORT
 app.listen(port,()=>{
console.log(`server is working IN ${process.env.NODE_ENV} on port ${port}`);
 })