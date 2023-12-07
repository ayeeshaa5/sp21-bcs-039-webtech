// import Users from '../models/usersModel.js';
import Users from '../models/userModel.js';
import { compareString, createJWT, hashString } from '../utils/index.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';
const hash = bcrypt.hash;



export const register = async (req, res, next) => {
    const{firstName, lastName, email, password} = req.body;

    //validate fields
    if(!firstName || !lastName || !email || !password){
       next('Please provide all fields');
       return;
    }
    try{
        const userExist = await Users.findOne ({email});
        if(userExist){
            next('User already exists');
            return;
        }
        const hashedPassword = await hashString(password);
        const user = await Users.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        });
        sendVerificationEmail(user, res);
    }
    catch(error){
        console.log(error);
        res.status(404).json({message:error.message})
    }
};

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        //validation
        if(!email || !password){
            next('Please provide email and password');
            return;
        }
        //find user by email
        const user = await Users.findOne({email}).select('+password').populate({
            path: 'friends',
            select: 'firstName lastName location profileUrl -password',
        });
        if(!user){
            next('Invalid credentials');
            return;
        }
        if (!user?.verified){
            next('Please verify your email');
            return;
        }
        //check if password matches
        const isMatch = await compareString(password, user?.password);
        if(!isMatch){
            next('Invalid credentials');
            return;
        }

        user.password = undefined;
        const token = createJWT(user._id);

        res.status(201).json({
            success:true,
            message: 'User logged in successfully',
            token,
            user,
        });

        
    } catch (error){
        console.log(error);
        res.status(404).json({message:error.message})
    }

};