const http = require("http");
const port = 3001
const fs = require("fs")
const url = require("url");
http.createServer((req,res)=>{
    const timestamp = new Date().toLocaleString();
     const log = "User is requested at :"+timestamp+"\n";
     const data = url.parse(req.url,true);
     console.log(data);
     fs.appendFile("server_log.txt",log,(err,data)=>{
    if(err) console.log(err);

     })
     switch(req.url){
        // case "/":
        //     // res.write("Welcome to the Home Page");
        //     res.writeHead(home);
        //     res.end();
        //     break;
        case "/about":
            res.write("This is the About Page"+data.query.name);
            res.end();
            break;
        default:
            res.writeHead(404, {"Content-Type": "text/html"});
            
            res.end("<h1> 404 Not Found </h1>");
     }
}).listen(port,()=>{
    console.log("Server is listening on port 3001");
}); 
