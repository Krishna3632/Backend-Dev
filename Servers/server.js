const express = require('express');
const app = express();
const { useRoutes } = require('./routes/userRoutes')
app.use(express.json());

app.route(useRoutes);

app.listen(4000,()=>{
    console.log("Server is running..")
})