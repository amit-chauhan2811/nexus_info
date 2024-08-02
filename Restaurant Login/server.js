import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const app = express();
app.use(json());

connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
    username: String,
    password: String,
});

const User = model('User', userSchema);

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User created');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }
    const token = sign({ userId: user._id }, 'SECRET_KEY');
    res.send({ token });
});

app.listen(5500, () => {
    console.log('Server running on port 5500');
});
