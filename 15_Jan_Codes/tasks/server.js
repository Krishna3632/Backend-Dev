const http = require("http");
const port = 3002
const fs = require("fs")
const url = require("url");


http.createServer((req,res)=>{
     const timestamp = new Date().toLocaleString();
     const log = "User is requested at :"+timestamp+"\n";
     const data = url.parse(req.url,true);
     console.log(data.query);
     fs.appendFile("server_log.log",log,(err,data)=>{
    if(err) console.log(err);

     })
    switch(req.url){
       case "/product":
        
           res.write("This is the Product Page");
           res.end();
           break;
    }
}).listen(port,()=>{
    console.log("Server is listening on port 3002");
});