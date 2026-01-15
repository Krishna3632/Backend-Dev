const fs = require("fs");


const logger = (message,user)=>{
    console.log(`Hello ${user}, ${message}`);
    fs.appendFile("log.txt",`{${user} : ${message} : ${new Date().toISOString()}}\n`,(err)=>{
        if(err){
            console.log(err);
        }
    });
}

const showL = ()=>{
    fs.readFile("log.txt","utf-8",(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    });
}
module.exports = {logger, showL};