const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post')
// const app = express();
// const cors = require("cors")


// app.use(cors());

router.put('/:id', async (req, res) => {
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password,salt)

        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateUser);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);
router.delete('/:id', async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        // await Comment.deleteMany({userId:req.params.id})
        res.status(200).json('User has been deleted');
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

router.get('/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

router.get('/', async (req, res) => {
    try{
        const user = await User.find()
        res.status(200).json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

module.exports = router;