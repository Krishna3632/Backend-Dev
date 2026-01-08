// const users = {
//     1:{name:"Krishna",place:"agra"},
//     2:{name:"Abhay",place:"delhi"},
//     3:{name:"Shivam",place:"mumbai"}
// }

// const checkOrder = (orderId)=>{
//     return new Promise((resolve,reject)=>{
//         const ord = users[orderId];

//         if(!ord){
//             reject("User not found");
//             return;
//         }

//         setTimeout(() => {
//             resolve("Order Shipped!");
//         }, 10000);
//     })
// }

// async function check(orderId) {
//     try{
//         const answer = await checkOrder(orderId);
//         console.log(answer);
//     }catch(err){
//         console.error(err);
//     }
// }

// check(1);


// const subs = {
//   "rahul123": { "name": "Rahul", "type": "Premium" },
//   "amit456": { "name": "Amit", "type": "Free" },
//   "neha789": { "name": "Neha", "type": "Premium" },
//   "rohit321": { "name": "Rohit", "type": "Free" },
//   "simran654": { "name": "Simran", "type": "Premium" },
//   "arjun987": { "name": "Arjun", "type": "Free" },
//   "priya246": { "name": "Priya", "type": "Premium" },
//   "karan135": { "name": "Karan", "type": "Free" },
//   "isha864": { "name": "Isha", "type": "Premium" },
//   "vikram579": { "name": "Vikram", "type": "Free" },
//   "nisha468": { "name": "Nisha", "type": "Premium" },
//   "sahil753": { "name": "Sahil", "type": "Free" },
//   "mehul159": { "name": "Mehul", "type": "Premium" },
//   "pooja357": { "name": "Pooja", "type": "Free" },
//   "anita951": { "name": "Anita", "type": "Premium" }
// }

// const getUser = (userId)=>{
//     return new Promise((resolve,reject)=>{
//         const user = subs[userId];

//         if(!user){
//             reject(new Error("User not found"));
//             return;
//         }

//         setTimeout(()=>{
//             console.log("(1.5 seconds pause)");
//             resolve(user);
//         },1500);
//     });
// }

// const checkSubscription = (user)=>{
//     return new Promise((resolve,reject)=>{
//         if(user.type === "Free"){
//             reject(new Error("No access to Netflix"));
//         } else {
//             resolve("Access granted to Netflix");
//         }
//     });
// }

// const loginFlow = async (userId)=>{
//     try{
//         console.log("User logging in...");

//         const user = await getUser(userId);             // step 1
//         const result = await checkSubscription(user);   // step 2

//         console.log(result);

//     } catch(err){
//         console.error(err.message);
//     }
// }

// loginFlow("rahul123");


const users = {
  "u101": {
    "id": "u101",
    "name": "Rahul",
    "isPremium": true
  },
  "u102": {
    "id": "u102",
    "name": "Amit",
    "isPremium": false
  },
  "u103": {
    "id": "u103",
    "name": "Neha",
    "isPremium": true
  },
  "u104": {
    "id": "u104",
    "name": "Pooja",
    "isPremium": false
  }
}

const orders = {
  "u101": [
    { "item": "Laptop", "price": 1000, "status": "delivered" },
    { "item": "Phone", "price": 500, "status": "pending" }
  ],
  "u102": [
    { "item": "Tablet", "price": 300, "status": "delivered" }
  ],
  "u103": [
    { "item": "Camera", "price": 700, "status": "pending" },
    { "item": "Headphones", "price": 150, "status": "delivered" }
  ],
  "u104": [
    { "item": "Monitor", "price": 400, "status": "delivered" }
  ]
}


const fetchUser = (userId)=>{
    return new Promise((resolve,reject)=>{
        const user = users[userId];

        if(!user){
            reject("User not found");
            return;
        }

        setTimeout(()=>{
            resolve(user);
        },1000);
    });
};

const fetchOrder = (userId)=>{
   return new Promise((resolve,reject)=>{
      const userOrders = orders[userId];

      if(!userOrders){
         reject("No orders");
         return;
      }

      setTimeout(() => {
        resolve(userOrders);
      },2000);
   });
};

const displayDashboard = async(userId)=>{
    try{
        const user = await fetchUser(userId);
        const orderList = await fetchOrder(userId);

        const delivered = orderList.filter(o => o.status === "delivered");

        let total = 0;

        if(user.isPremium){
            total = delivered.reduce((sum, order) => sum + order.price, 0);
        }

        console.log("User:", user.name);
        console.log("Delivered Orders:", delivered);
        console.log("Total Order Value:", total);

    } catch(err){
        console.error(err);
    }
};

displayDashboard("u101");

const searchItem = [
  { "id": 101, "name": "Laptop Pro", "category": "Electronics", "price": 1200, "rating": 4.7, "stock": 15 },
  { "id": 102, "name": "Smartphone X", "category": "Electronics", "price": 800, "rating": 4.5, "stock": 0 },
  { "id": 103, "name": "Wireless Headphones", "category": "Electronics", "price": 150, "rating": 4.2, "stock": 30 },
  { "id": 104, "name": "Office Chair", "category": "Furniture", "price": 300, "rating": 4.1, "stock": 8 },
  { "id": 105, "name": "Standing Desk", "category": "Furniture", "price": 650, "rating": 4.6, "stock": 5 },
  { "id": 106, "name": "Gaming Mouse", "category": "Electronics", "price": 60, "rating": 4.0, "stock": 50 },
  { "id": 107, "name": "Water Bottle", "category": "Accessories", "price": 20, "rating": 3.8, "stock": 100 },
  { "id": 108, "name": "Backpack", "category": "Accessories", "price": 90, "rating": 4.3, "stock": 25 },
  { "id": 109, "name": "Notebook", "category": "Stationery", "price": 10, "rating": 3.5, "stock": 200 },
  { "id": 110, "name": "Pen Set", "category": "Stationery", "price": 25, "rating": 3.9, "stock": 150 },
  { "id": 111, "name": "Monitor 27\"", "category": "Electronics", "price": 400, "rating": 4.4, "stock": 12 },
  { "id": 112, "name": "Montard Mechanical", "category": "Electronics", "price": 120, "rating": 4.6, "stock": 20 },
  { "id": 113, "name": "Table Lamp Monte", "category": "Furniture", "price": 70, "rating": 4.0, "stock": 18 },
  { "id": 114, "name": "USB-C Hub", "category": "Electronics", "price": 45, "rating": 4.2, "stock": 40 },
  { "id": 115, "name": "Desk Organizer", "category": "Accessories", "price": 35, "rating": 3.7, "stock": 60 }
]
const search = (text)=>{
   const filterItem = searchItem.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
   return filterItem;
}

console.log(search("Mon")) 