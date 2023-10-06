const {Books} = require('./models/book.model.js')
const {books} = require('./data.js')
const dbConnection = require('./config/dbConnection')
require('dotenv').config()

//connection to db
dbConnection();

// import Books
const importBooks=async()=>{
    try {
        await Books.insertMany(books);
        console.log("Books imported ");
     } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Remove Books
const removeBooks=async()=>{
    try {
        await Books.deleteMany();
        console.log("Books removed ");
     } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2]==="-import") importBooks();
else if (process.argv[2]==="-remove")removeBooks()