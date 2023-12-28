const express = require('express');
const router = express.Router();
// const cors = require("cors")
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const app = express();


// app.use(cors());
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password} = req.body;
        const salt = await bcrypt.genSalt(3);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userDoc = await User({ name, email, password:hashedPassword });
        const savedUser = await userDoc.save();
        res.status(200).json(savedUser); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
});

router.post('/login', async (req, res) => {
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
            return res.status(401).json({error:'Invalid credentials'});
        }
        const token=jwt.sign({_id:user._id,name:user.name,email:user.email},process.env.SECRET,{expiresIn:"2d"})
        const {password , ...info} = user._doc;
        res.cookie('token',token).status(200).json(info);
    
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

router.get('/logout', async (req, res) => {
    try{
        res.clearCookie('token',{sameSite:"none",secure:true}).status(200).send('Logged out successfully');
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return
            // return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})



module.exports = router;
