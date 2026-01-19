const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{
     const path = url.parse(req.url,true).pathname;
     res.setHeader("Content-Type","text/plain");
     switch (path){
             case "/login":
                    const { user,pass } = url.parse(req.url,true).query;
                    if(user && pass){
                        if(user==="admin" && pass==="pass1234"){
                                 res.setHeader("Set-Cookie", "auth=true");
                                    res.statusCode=200;
                                    res.end("User is authorized");
                        }
                        else{
                            res.setHeader("Set-Cookie","auth=false");
                            res.statusCode=401;
                            res.end("Unauthorized");
                        }
                    }
                    else{
                        res.end("Provide Credentials!!!");

                    }
                    break;
            
                case "/home":
                    const cookies = req.headers.cookie || "";
                    const parsed = Object.fromEntries(
                         cookies.split("; ").map(c => c.split("="))
                    );

                    if (parsed.auth === "true") {
                            res.end("User can access");
    // authorized
                    }
                    
                    else{
                        res.end("Not allowed");
                    }
                    break;
            case "/logout":
                res.setHeader("Set-Cookie","auth=false");
                res.end("Logged Out");
                break;
            
            

     }
});

server.listen(4002,()=>{
    console.log("Server is running");
})