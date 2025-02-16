import User from '../models/User.js';
import bcrypt from 'bcrypt';
import TokenUtils from '../utils/TokenUtils.js';
import validator from 'validator';

class userController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            
            if (!name || !email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields" });
            }
            if (!validator.isEmail(email)) {
                return res.status(400).json({ msg: "Invalid email format" });
            }
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters long" });
            }

            
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ msg: "User with this email already exists" });
            }

            
            const passwordHash = await bcrypt.hash(password, 4);

            const newUser = new User({ name, email, password: passwordHash });
            await newUser.save();

            const accessToken = TokenUtils.createAccessToken({ id: newUser._id });
            const refreshToken = TokenUtils.createRefreshToken({ id: newUser._id });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ accessToken, user: { id: newUser._id, name, email } });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields" });
            }
            if (!validator.isEmail(email)) {
                return res.status(400).json({ msg: "Invalid email format" });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "User does not exist" });
            }

            const isMatching = await bcrypt.compare(password, user.password);
            if (!isMatching) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const accessToken = TokenUtils.createAccessToken({ id: user._id });
            const refreshToken = TokenUtils.createRefreshToken({ id: user._id });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
             
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ accessToken, user: { id: user._id, name: user.name, email } });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }
}

export default new userController();
