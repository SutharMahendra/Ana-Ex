import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// this is userSchema that stored in database 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// here we use one logic that before save it in database we make sure that there is no any update is remaining 
// use pre save that save password in hash 
// hashing is technique work as middleware which store unique password before moving it in database

userSchema.pre('save', async function (next) {
    // if user dont change it's password then no need to store it in hash 
    if (!this.isModified('password')) {
        return next();
    }

    // here logic for hashing password
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

const User = mongoose.model('User', userSchema);
export default User;