const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{
       const path = url.parse(req.url,true).pathname;
       res.setHeader("Content-Type","text/html");
       switch (path){
           case "/success":
               res.statusCode=200;
               res.end("<h1>Page Founded");
               break;
            case "/bad-request":
                res.statusCode=400;
                res.end("<h1>Bad request has been made");
                break;
            case "/unauthorized":
                res.statusCode=401;
                res.end("<h1>Unauthorized</h1>");
                break;
            case "not-found":
                res.statusCode=404;
                res.end("<h1>Route not found</h1>");
                break;
            default:
                res.statusCode=404;
                res.end("<h1>Route not found</h1>");
                break;
       }
});

server.on("connection", (req,res)=>{
    log(req);
})
server.listen(4001,()=>{
    console.log("server is running");
})  