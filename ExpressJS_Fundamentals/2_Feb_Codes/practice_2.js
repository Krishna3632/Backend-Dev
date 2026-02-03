const express = require('express');
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({"message":
      "Welcome to the Home Page!!"
    })
})

app.get()
app.listen(4000,()=>{
    console.log("Server is running...");
})