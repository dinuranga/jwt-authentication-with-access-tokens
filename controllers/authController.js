const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { generateHash, compareHash } = require('../helpers/bcryptHelper');

const secretKey = '1234';

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(500).json({ error: "No user found!" });
        }

        const userId = user._id;
        const hashedPassword = user.password;
        const isMatched = await compareHash(password, hashedPassword);

        if (isMatched) {
            const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '1m' });
            const updateToken = await userModel.findByIdAndUpdate(userId, { token });
            await updateToken.save();
            res.cookie('token', token, { httpOnly: true, maxAge: 60000 });
            res.status(200).json({ message: "Authenticated successfully!" });
        } else {
            res.status(500).json({ error: "Incorrect password!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.userId; 
            const deleteToken = await userModel.findByIdAndUpdate(userId, { token: null });
            res.clearCookie('token');
            res.status(200).json({ message: "Logout successful" });
        } catch (err) {
            res.status(401).json({ error: "Invalid token" });
        }
    } else {
        res.status(401).json({ error: "You aren't logged in!" });
    }
}

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.userId;

            const user = await userModel.findById(userId);

            if (user && user.token === token) {
                req.userId = userId;
                next();
            } else {
                res.status(401).json({ error: "Invalid token" });
            }
        } catch (err) {
            res.status(401).json({ error: "Invalid token" });
        }
    } else {
        res.status(401).json({ error: "You're not logged in!" });
    }
}

module.exports = {
    loginUser,
    logoutUser,
    authenticate
}