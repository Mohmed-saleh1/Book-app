const express = require('express')
const app = express();

const books = [
    {name:"ahmed",age:21},
    {name:"Mohamed",age :22}
]
app.get('/',(req,res)=>{
    res.json(books)
})
const port = 4000
app.listen(port,()=>{
    console.log(`server is working on port ${port}`);
})