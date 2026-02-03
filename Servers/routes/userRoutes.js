const express=require('express');

const useRoutes = express();


useRoutes.get("/",(req,res)=>{
     return res.json({"message":"All ok"});
});


useRoutes.get("/allUser",(req,res)=>{

})

module.exports = { useRoutes };