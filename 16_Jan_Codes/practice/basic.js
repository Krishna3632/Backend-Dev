const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req,res)=>{
     
     const query = url.parse(req.url,true).pathname;
     switch (query){
         case "/":
            res.statusCode = 200;
            res.writeHead("Content-Type","text/html");
            res.end("<h1>Welcome to the Home Page!!");
            break;
          case "/home":
            res.writeHead(201);
            res.end("<h1>Welcome to the ABout pAGE!!");
            break;
     }

});


server.listen(4000,()=>{
    console.log("Server running!!");
})