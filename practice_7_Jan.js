const users = {
    "name":"Krishna Sharma",
    "email":"XXXXXXXXXXXXXXXXX",
    "password":"12345",
    "age":20,
    "city":"Delhi",
    "country":"India"
}


const {name,email,password,age,city,country} = users;

// const updatedUser = {...users,city:"Mumbai",country:"India"}
// console.log(users)
// console.log(updatedUser)


// const user1= users.copy();
// user1.name = "Krishna";
// console.log(user1)
// console.log(users);


const numbers =[1,2,3,4,5];
const newNumbers = numbers.map((num)=> num*2);
console.log(numbers);
console.log(newNumbers);

const changedNumbers = numbers.forEach((num)=> num*2);
console.log(changedNumbers);


