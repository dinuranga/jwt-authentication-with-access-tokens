const mongoose = require('../config/mongooseConfig');

const {Schema} = mongoose;

const userSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    token:{
        type: String
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;