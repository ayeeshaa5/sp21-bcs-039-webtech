import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';
import { hashString } from './index.js';
import Verification from '../models/emailVerification.js';
import PasswordReset from '../models/PasswordReset.js';


dotenv.config();

const {AUTH_EMAIL, AUTH_PASSWORD, APP_URL}=process.env;

let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD
    }
});

export const sendVerificationEmail = async (user, res) => {
const {_id, email, lastName}= user;
const token = _id + uuidv4();
const link = APP_URL+ 'users/verify/' + _id + '/' +token;
const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: 'Email verification',
    // html: `<div
    // style= 'font-family:Arial, sans-serif; font-size:20px; color:#333; background-color:
    // <h1 style='color:rgb(8,56,188)'>Please verify your email address</h1>
    // <hr>
    // <h4>Hi ${lastName},</h4>
    // <p> Please verify your email address<br>
    // <p>This link<b> expires in 1 hour</b>
    // </p>
    // <br>
    // <a href=${link}
    //  style='color:#fff; padding:14px; text-decoration:none; background-color:#000;
    //  Email Address </a>
    //  </p>
    //  <div style='margin-top:20px;'>
    //     <h5>Best regards,</h5>
    //     <h5>Team InstaAmigos</h5>
    //     </div>
    //     </div>`
    html: `<div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #fff;'>
    <h1 style='color: rgb(8, 56, 188);'>Please verify your email address</h1>
    <hr>
    <h4>Hi ${lastName},</h4>
    <p> Please verify your email address</p>
    <p>This link <b>expires in 1 hour</b></p>
    <br>
    <a href='${link}' style='color: #fff; padding: 14px; text-decoration: none; background-color: #000;'>
        Verify Email Address
    </a>
    <div style='margin-top: 20px;'>
        <h5>Best regards,</h5>
        <h5>Team InstaAmigos</h5>
    </div>
</div>`

};
try{
    const hashedToken = await hashString(token);

    const newVerifiedEmail = await Verification.create({
        userId: _id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
        
    });
    if (newVerifiedEmail){
        transporter
        .sendMail(mailOptions)
            .then (() => {
                res.status(201).send({
                    success:'PENDING',
                    message: 'Email sent successfully. Please check your email for verification.'

                });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({message:'Something went wrong'});
            });

}
}catch(error){
    console.log(error);
    res.status(404).json({message:'Something went wrong'})
}};

export const resetPasswordLink = async (user, res) => {

    const {_id, email} =user;
    const token = _id + uuidv4();
    const link = APP_URL + 'users/reset-password/' + _id + "/" + token;
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: 'Password Reset',
        
        html: `<p style="font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #fff;">
        Password Reset link
        <br>
        <p style="font-size: 18px;"><b>This link expires in 10 minutes</b></p>
        <br>
        <a href="${link}" style="color: #fff; padding: 14px; text-decoration: none; background-color: #000;">
            Reset Password
        </a>
    </p> `
    
    };

    try{
        const hashedToken = await hashString(token);

        const resetEmail = await PasswordReset.create({
            userId:_id,
            email:email,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
        });
        if (resetEmail){
            transporter
            .sendMail(mailOptions)
            .then(() => {
                res.status(201).send({
                    status:'PENDING',
                    message: 'Password reset link sent successfully. Please check your email.'
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({message:'Something went wrong'});
            });
        }
    }
    catch(error)  {
        console.log(error);
        res.status(404).json({message:'Something went wrong'});
    };
};