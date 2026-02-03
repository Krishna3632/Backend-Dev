const http = require('http');
const url  = require('url');



const user = {
    1:{"name":"Krishna","age":19}
};
const server =http.createServer((req,res)=>{
      const data = url.parse(req.url,true);
      console.log(data);
      const pathname = data.pathname;
      const query = data.query;
      console.log(query);
      switch (pathname){
        case '/':
            res.end("Welcome to the Home Page");
            break;
        
        case '/user':

             if(!query.id){
                res.end("Provide me the correct id");
             }

    
                 res.end(JSON.stringify(user[query.id]));
             
             break;
      }
});


server.listen(4000,()=>{
    console.log("Server is running.");
});