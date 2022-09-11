const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//create jwts
const age = 1 * 24 * 60 * 60;
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_STRING, { expiresIn: age });
}
//signing up a user
module.exports.signup = async (req, res) => {
    const { email, password, userName } = req.body;

    try{
        const user = await User.signUp(email, password, userName);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: age * 3 });
        res.status(200).json({user, token});
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}

//logging in a user
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.logIn(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: age * 3 });
        res.status(200).json({user, token});
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}

//get all users
module.exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find({}, { email: true, userName: true });
        res.status(200).json(users);
    }catch(error){
        res.status(401).json({ error: error.message });
    }
}