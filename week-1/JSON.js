const users = '{"name": "Pavan", "age": 21, "gender": "male"}'

const user = JSON.parse(users);
console.log(user.name); // Pavan

const userData = {
    name: "Pavan", 
    age: 21, 
    gender: "male"
}
const userStr = JSON.stringify(userData);
console.log(userStr);