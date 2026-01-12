// const data = async ()=>{
//     const user = await fetch("https://jsonplaceholder.typicode.com/users");
//     console.log(await user.json());
// }

// data();


const data = async ()=>{

await fetch("https://jsonplaceholder.typicode.com/users").then(async (res)=>{
    console.log(await res.json());
}).catch((err)=>{
 console.log(err);
})

};
data();