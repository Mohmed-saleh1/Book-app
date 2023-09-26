const express= require('express');

const bookRouter = require('./routes/books.route')

// Init The App
const app = express();

//apply middlewares
app.use(express.json());

// Mount Routes
app.use('/api/books',bookRouter)


//Running The Server
const port = 4000
 app.listen(port,(req,res)=>{
console.log(`server is working on port ${port}`);
 })