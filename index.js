const express = require('express')
const app = express()
app.use(express.json());
app.use((req, res, next) => {
    res.status(404).send({ error: 'Endpoint not found' });
});

const users = [
    {id: 1, name: "Andrii", mail: "sertam@gmail.com"},
    {id: 2, name: "Vladimir", mail: "qweee@gmail.com"},
    {id: 3, name: "Alex", mail: "alam@gmail.com"},
    {id: 4, name: "Alexandr", mail: "mpasr@gmail.com"},
    {id: 5, name: "Rostislav", mail: "chasd@gmail.com"}
]

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/users', function (req, res) {
    res.send(users)
})

app.post('/users', function (req, res) {
    const usersList = req.body;
    if (usersList) {
        usersList.id = users.length + 1
        users.push(usersList)
        res.send(usersList)
    }

})

app.get(`/users/:id`, function (req, res) {
    const id = req.params.id;
    const foundUser = users.find(user => user.id === Number(id))
    if (foundUser){
        res.send(foundUser)
    }
    else {
        res.send("User not found")
    }

})

app.listen(3000)