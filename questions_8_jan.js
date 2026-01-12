const order = {
    1:{"item":"Laptop","price":45000,"recieved":true},
    2:{"item":"Mobile","price":15000,"recieved":false}
}
const checkOrder = (orderId)=>{
      return new Promise((resolve,reject)=>{
        const ord = order[orderId];
        if(ord){
            console.log("Fetching order details...");
            new Promise((res)=>setTimeout(()=>res(),2000));
            resolve(ord);
        }else{
            reject("Order not found!!");
        }
    });
}

checkOrder(1)
    .then((details)=>console.log("Order:", details))
    .catch((err)=>console.error(err));

// Task 2
const users = [
    {name:"Krishna","type":"premium"},
    {name:"Shivam","type":"basic"}
]
    

const auth = (username)=>{
    return new Promise((resolve,reject)=>{
        const user = users.find((u)=>u.name===username);
        if(user) {
            new Promise((res)=>setTimeout(()=>res(),2000));
            resolve(user);
        } else {
            reject("no user found");
        }
    });
}

const checkSub = (user)=>{
        if(user.type==="premium") return "Access Granted to Netflix";
        else return "No access";
}

const complete = (username)=>{
    auth(username)
        .then((user)=>checkSub(user))
        .then((msg)=>console.log(msg))
        .catch((err)=>console.error(err));
}

complete("Krishna");

// Task 3

async function dashboard(id) {
    const order = await checkOrder(id);
    const subscription = await auth("Shivam");
    console.log("Order Details:", order);
    console.log("Subscription Details:", subscription);

}
dashboard(1);