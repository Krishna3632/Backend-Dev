const fs = require('fs');

fs.copyFile("test.txt","new_test.txt",(err)=>{
    if(err){
        console.log("File failed to log",err);
        
    }
    else{
        console.log("File logged");
        
    }
})

fs.copyFileSync("urgent.txt","test.txt")
console.log("File is copied");