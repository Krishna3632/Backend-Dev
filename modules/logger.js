const fs = require("fs");


const user = (message,user)=>{
    console.log(`Hello ${user}, ${message}`);
    fs.appendFile("log.txt",`{${user} : ${message} : ${new Date().toISOString()}}\n`,(err)=>{
        if(err){
            console.log(err);
        }
    });
}

user("Welcome to the system","Krishna");