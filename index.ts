import express, {Request, Response} from 'express';
import {connect, model, Schema} from 'mongoose';
import customMiddleware from './customMiddelware';

const app = express();

require('dotenv').config();
app.use(express.json());
app.use(customMiddleware);

run().catch(err => console.log(err));

async function run() {
    await connect(process.env.MONGODB_URI).then(() => console.log('Connected!'))
}

interface IUser {
    name: string,
    mail: string
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    mail: {type: String, required: true},
})

const User = model<IUser>('Users', userSchema);
app.get('/', function (req: Request, res: Response) {
    try {
        res.send('Hello World')
    } catch (error) {
        res.status(500).send('Error')
    }
})
app.get('/users', async function (req: Request, res: Response) {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users')
    }
})

app.post('/users', async function (req: Request, res: Response) {
    try {
        const usersList = req.body;
        if (usersList) {
            const newUsers = await User.create(usersList);
            res.status(201).json(newUsers);
        }
    } catch (error) {
        res.status(500).send('Error post user')
    }

})

app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const foundUser = await User.findById(id);

        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching user");
    }
});


app.use((req: Request, res: Response) => {
    res.status(404).send({error: 'Endpoint not found'})
});
app.listen(3000)