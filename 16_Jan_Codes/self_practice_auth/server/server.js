const http = require('http');
const url = require('url');
const createLog = require('./utils/create.log');


const server = http.createServer((req,res)=>{
      const path = url.parse(req.url,true);
      res.setHeader("Content-Type","text/html");
      switch (path.pathname){
           case "/":
              createLog({ user: "Krishna", task: "page", activities: ["Home Page Accessed"] });
              res.end("Home Page");

              break;
            
           case "/auth":
            createLog({user:})
      }
               

});

server.listen(4003,(req,res)=>{
    console.log("Server is running!!!");
})