const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Post = require('../models/Post')
const verifyToken = require('../verifyToken')
// const app = express();
// const cors = require("cors")


// app.use(cors({origin:"http://localhost:5173",credentials:true}))

router.post("/create", async(req,res)=>{
    try{
        const newPost=new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(200).json(err)
    }
} )

router.put('/:id',verifyToken, async (req, res) => {
    try{
        
        const updatePost = await Post.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatePost);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);
router.delete('/:id',verifyToken, async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json('Post has been deleted');
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

router.get('/:id',async (req, res) => {
    try{
        const w_post = await Post.findById(req.params.id)
        res.status(200).json(w_post);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

// router.get('/', async (req, res) => {
//     const query = req.query
//     // console.log(query)
//     try{
//         const searchFilter={
//             title:{$regex:query.search,$options:"i"}
//         }
//         const w_posts = await Post.find(query.search?searchFilter:null)
//         res.status(200).json(w_posts);
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
//     }
// }
// );
router.get("/", async (req, res) => {
    const { page = 1, perPage = 2, search } = req.query;

    try {
        const searchFilter = search
            ? { title: { $regex: search, $options: "i" } }
            : {};

        const posts = await Post.find(searchFilter)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:userId',
 async (req, res) => {
    try{
        const w_posts = await Post.find({userId:req.params.userId})
        res.status(200).json(w_posts);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error response
    }
}
);

// router.get("/search/:prompt",async(req,res)=>{
//     try{

//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }
// )

module.exports = router;