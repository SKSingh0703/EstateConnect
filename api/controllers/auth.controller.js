import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res ,next) => {
    const { username, email, password } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("User Created Successfully");
    } catch (error) {
        next(error);
    }
};
