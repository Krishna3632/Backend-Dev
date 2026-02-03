const fs = require('fs');

fs.mkdir("new Directory", (err) => {
    if (err) return;
    console.log("Directory created");
});
fs.mkdir("folders/folder1/folder2", { recursive: true },(err)=>{
    if(err){
        console.log("Directory creation failed",err);
        return;
    }
    else{
        console.log("Directory created");
    }
})

