const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const SALT_ROUNDS = 10;

const generateHash = async (plainText) => {
    try{
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedText = await bcrypt.hash(plainText,salt);
        return hashedText;
    }catch(err){
        throw err;
    }
};

const compareHash = async (plainText, hashedText) => {
    try{
        const result = await bcrypt.compare(plainText,hashedText);
        return result;
    }catch(err){
        throw err;
    }
}   

module.exports = {
    generateHash,
    compareHash
}