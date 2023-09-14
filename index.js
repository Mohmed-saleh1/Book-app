const http = require('http')

const books = [{name:"ahmed",age:22},{name:"Mohamed",age:23}]
const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.write(" <h1> ya welcome ya welcome :) </h1> ")
        res.end()
    }
    if (req.url==="/api/books") {
        res.write(JSON.stringify(books))
        res.end()
    }
});
const port = 4000
server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})