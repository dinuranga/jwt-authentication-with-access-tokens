const userModel = require('../models/userModel');
const { generateHash } = require('../helpers/bcryptHelper');

const registerUser = async (req, res) => {
    const { username, email, password, token } = req.body;

    try {
        const existingUsername = await userModel.findOne({ username });
        const existingEmail = await userModel.findOne({ email });

        if (existingUsername) {
            return res.status(400).json({ error: "Username already registered!" });
        }

        if (existingEmail) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        const hashedPassword = await generateHash(password);
        const newUser = new userModel({ username, email, password: hashedPassword, token });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to register user!" });
        console.log(err);
    }
}

module.exports = {
    registerUser
}