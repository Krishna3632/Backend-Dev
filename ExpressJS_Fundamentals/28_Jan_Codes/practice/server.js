const express = require('express');
const app = express();

app.use(express.json());

const users = {
  1: { name: 'Alice', age: 25 },
  2: { name: 'Bob', age: 30 },
  3: { name: 'Charlie', age: 35 },
  4: { name: 'David', age: 28 },
  5: { name: 'Eve', age: 22 },
  6: { name: 'Frank', age: 33 }
};


app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = users[userId];

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello, ExpressJS!');
});

app.get('/search/:q', (req, res) => {
    const query = req.params.q;
    const results = Object.values(users).filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json(results);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});