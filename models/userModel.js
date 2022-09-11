const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
}, { timestamps: true });

//signing up a user
userSchema.statics.signUp = async function(email, password, userName){
    const self = this;

    //validate inputs
    if(!email || !password || !userName){
        throw Error('please fill up the required field');
    }
    if(!validator.isEmail(email)){
        throw Error('enter a valid email address');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password must be 8 characters long comprising of an uppercase, number and special characters ($, &, %, ^)');
    }

    //check for exisiting email
    const emailExists = await self.findOne({ email });
    if(emailExists){
        throw Error('email already exisits. chose another one');
    }

    //check for exisiting username
    const usernameExists = await self.findOne({ userName });
    if(usernameExists){
        throw Error('username already exisits. chose another one');
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    //create a user
    const user = await self.create({ email, password: hashedPwd, userName });
    return user;
}

//logging in a user
userSchema.statics.logIn = async function(email, password){
    const self = this;

    //validate input
    if(!email || !password){
        throw Error('please fill up the required field');
    }

    //check for email and return a user
    const user = await self.findOne({ email });
    if(user){
        const compare = await bcrypt.compare(password, user.password);

        if(compare){
            return user;
        }
        throw Error('wrong password!');
    }
    throw Error('email does not exist in database');
}

const User = model('user', userSchema);

module.exports = User;