const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const fs=require('fs');
// image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});


const { validateAddUser, validateUpdateUser, handleValidationErrors } = require('./validators');


const upload = multer({ storage: storage }).single('image');

// insert user
 router.post('/add', (req, res) => {
    
    
    upload(req, res, function (err) {
        if (err) {
            return res.json({ message: err.message, type: 'danger' });
        }

        // image upload successful, create the user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file ? req.file.filename : null, // check if file exists
        });

        // save the user to the database using Promises
        user.save()
            .then(() => {
                req.session.message = {
                    type: 'success',
                    message: 'User Added Successfully'
                };
                res.redirect('/');
            })
            .catch((err) => {
                res.json({ message: err.message, type: 'danger' });
            });
    });
});



router.get('/users', (req, res) => {
    res.send('All Users');
});

router.get('/', (req, res) => {
    User.find().exec()
        .then((users) => {
            res.render('index', {
                title: 'Home Page',
                users: users
            });
        })
        .catch((err) => {
            res.json({ message: err.message });
        });
});

router.get('/add', (req, res) => {
    res.render('add_users', { title: 'Add Users' });
});

// EDIT USER
router.get('/edit/:id', (req, res) => {
    const userId = req.params.id;

    
    User.findById(userId)
        .exec()
        .then((user) => {
            if (!user) {
                
                return res.status(404).send('User not found');
            }

            // Render the edit_users template with the user data
            res.render('edit_users', { title: 'Edit User', user: user });
        })
        .catch((err) => {
            // Handle any errors that occur during the database query
            res.json({ message: err.message, type: 'danger' });
        });
});


router.post('/update/:id', upload, async (req, res) => {
    try {
        let id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        const result = await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        });

        if (!result) {
            return res.status(404).send('User not found');
        }

        req.session.message = {
            type: 'success',
            message: 'User Updated Successfully'
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('User not found');
        }

        if (result.image != "") {
            try {
                fs.unlinkSync('./uploads/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }

        req.session.message = {
            type: 'info',
            message: 'User Deleted Successfully'
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message });
    }
});



module.exports = router;
