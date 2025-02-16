import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import createAccessToken from './tokens.js';

class userController{

    async register(req,res){
        try{
            const {name,email,password} = req.body;
            if(!name || !email || !password){
                return res.status(400).json({msg:"Please fill in all fields"});
            }
            if(password.length < 6){
                return res.status(400).json({msg:"Password must be atleast 6 characters long"});
            }
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({message:"User with this email is already exists"});

            }
            const passwordHash = await bcrypt.hash(password,5);
            const newUser = new User({name,email,password:passwordHash});
            await newUser.save();
            const accessToken = createAccessToken({id:newUser._id});
            return res.json({user:newUser,accessToken});

        }
        catch(e){
            console.log(e);
        }
    }
    async login(req,res){
        try{
            const {email,password} =req.body;
            if(!email || !password){
                return res.status(400).json({msg:"Please fill in all fields"});
            }
            const user = await User.findOne({email});

            if(!email){
                return res.status(400).json({msg:"user does not exist"});
            }
            const isMathing = await bcrypt.compare(password,user.passwrd);
            if(!isMathing){
                return res.status(400).json({msg:"Invalid credentials"});
            }
            const accessToken = createAccessToken({id:user._id});
            return res.json({user,accessToken});
            
        }catch(e){
            console.log(e);
        }

    }

}

export default new userController();
