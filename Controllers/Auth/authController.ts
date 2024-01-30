import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../Models/User";

const register = async (req: any, res: any) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};