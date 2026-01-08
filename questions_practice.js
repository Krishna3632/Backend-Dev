// Task-1

const rawUsers = [
{ id: 1, name: "Rahul", password: "fb_password", role: "admin" },
{ id: 2, name: "Sanya", password: "123_password", role: "user" },
{ id: 3, name: "Amit", password: "secret_password", role: "user" }
];

const cleanedUser = rawUsers.map(({password,...safe})=>(safe));

console.log(cleanedUser);

const admin = rawUsers.filter((user)=>{
if(user.role==="admin") return user
})
console.log(admin)
//Task-2

const cart = [
{ item: "Laptop", price: 50000, quantity: 1, inStock: true },
{ item: "Mouse", price: 1500, quantity: 2, inStock: true },
{ item: "Keyboard", price: 3000, quantity: 1, inStock: false }
];

const nostock = cart.filter((user)=>{
    if(!user.inStock) return user
})
console.log(nostock);

const every = cart.filter((user)=>{
    if(!user.inStock) return user
}).length;

(every==cart.length)?console.log("Ready to ship"):console.log("Wait");

const totalBill = cart.reduce((value,item)=>{
   return value+item.price*item.quantity
})
console.log(totalBill)