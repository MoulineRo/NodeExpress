const express = require('express')
const app = express()

const mongoose = require('mongoose');
const {Schema} = mongoose;
const customMiddleware = require('./customMiddelware');

require('dotenv').config();
app.use(express.json());
app.use(customMiddleware);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected!'))
    .catch(err => console.error('Connection error:', err));


const userSchema = new Schema({
    name: String,
    mail: String
})

const User = mongoose.model('Users', userSchema);

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/users', async function (req, res) {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
})

app.post('/users', async function (req, res) {
    const usersList = req.body;
    if (usersList) {
        const newUsers = await User.create(usersList);
        res.status(201).json(newUsers);
    }

})

app.get(`/users/:id`, async function (req, res) {
    const id = req.params.id;
    const foundUser = await User.findById(id)
    if (foundUser) {
        res.status(200).json(foundUser);
    } else {
        res.status(404).send("User not found")
    }

})

app.use((req, res, next) => {
    res.status(404).send({error: 'Endpoint not found'});
});

app.listen(3000)