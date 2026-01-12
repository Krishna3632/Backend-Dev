console.log("User fetching the data fdrom the server...");
let user;
setTimeout(() => {
    console.log("Settineout consumed!!");
    console.log(`User : ${user}`);
}, 0);

console.log("Nothing!!");


const fetchUser = (userId)=>{
    return new Promise((resolve,reject)=>{
    const users= {
        1:{"name":"Krishna","place":"agra"},
        2:{"name":"Abhay","place":"delhi"}
    }
    const user = user[userId];
    if(user){
        resolve("User Found");

    }else{
        reject("Not found!!");
    }
})
}


