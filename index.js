const express = require('express')
const app = express();
app.use(express.json())

const books = [
   {
    id:1,
    title:"Black Swan",
    auther:"Nasim Taleb",
    description:"About Black Swan",
    price:10,
    cover:"soft cover"
   }, {
    id:2,
    title:"Rich Dad Poor Dad",
    auther:"Robert Kiyosaki",
    description:"About Rich Dad and Poor Dad",
    price:12,
    cover:"soft cover"
   }
]
app.get('/api/books',(req,res)=>{
    res.status(200).json({books_no :books.length,books})
})

app.get('/api/books/:id',(req,res)=>{
    const book = books.find(b=> b.id=== +req.params.id)
    if(book){
        res.status(200).json(book)
    }
    else{
        res.status(404).json(`there is no book for this id : ${b.id}`)
    }
})

app.post('/api/books',(req,res)=>{
    console.log(req.body);
    const book = {
        id:books.length+1,
        title:req.body.title,
        auther:req.body.auther,
        price: req.body.price,
        description:req.body.description
    }
    books.push(book);
    res.status(201).json(book)
})

const port = 4000
app.listen(port,()=>{
    console.log(`server is working on port ${port}`);
})