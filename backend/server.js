require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = 'users.json';
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey"; // Secret key for JWT

// Load users from file
const getUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Save users to file
const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// SIGNUP: Hash password before saving
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    saveUsers(users);

    res.status(201).json({ message: "Signup successful!" });
});

// LOGIN: Verify password and return JWT token
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful!", token });
});

// Start the server
app.listen(5001, () => {
    console.log('Server running on portt 5001');
});
