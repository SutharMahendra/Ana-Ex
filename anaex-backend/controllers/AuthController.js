import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// this part is for register controller 
export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // here we check that if email is already exist or not?
        console.log('email is checking');
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'email is already exist' });
        }
        console.log('email is checked');

        // create new user (password will be hashed in the User model pre-save hook)
        console.log('creating user');
        const user = await User.create({ name, email, password });
        console.log('user is created');

        // generate the token for that user and valid this token for 7 days only
        console.log('token is creating');
        console.log('userId', user._id);
        console.log('jwt key', JWT_SECRET_KEY);
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
        console.log('token created');

        // user with detail and it's token 
        // we dont share the password 
        console.log('successful');
        return res.status(201).json({
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log('this is registration error in controller');
        return res.status(500).json({ message: `error is in register controller${error}` });
    }
}

// this part is for login controller 

export const login = async (req, res) => {
    try {
        // get the data from webpage
        const { email, password } = req.body;

        // we check that if email is present or not 
        // if not it means that user is not present 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        // if user exist then we check it's password is matching or not 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'invalid password' });
        }

        // if credentials are match then we generate token for it 
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });

        // respond with token and user details
        return res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}