const http = require('http');
const fs = require('fs');
const url = require('url');


const server = http.createServer((req,res)=>{
    const pathname = url.parse(req.url,true).pathname;

    switch (pathname){
        case "/admin":
            const { user,password } = url.parse(req.url,true).query;
            res.setHeader('Content-Type','text/html');

            if(user && password){
                if(user === "admin" && password === "admin123"){
                fs.readFile(
                    "/Users/krishna/Code/Backend_Dev_Bridge/16_Jan_Codes/tasks/admin.html",
                    (err,data)=>{
                        if(err){
                            res.statusCode = 500;
                            res.write('<h1>Server Error</h1>');
                            return;
                        }
                        res.statusCode = 200;
                        res.write(data);

                    }
                )
            }

            else{
                res.statusCode = 401;
                res.write('<h1>Invalid Credentials</h1>');
                
            }
            break;

        }
        case "/":
            res.write("<h1>Admin Login</h1>");
            res.end();
            break;
        }

})

server.listen(4000,()=>{
    console.log("Server running!!");
})
