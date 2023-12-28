// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    User.findOne({ username: username })
        .exec()
        .then((user) => {
            if (!user || user.password !== password) {
                // User not found or password does not match
                return res.render('login', { title: 'Login', error: 'Invalid username or password' });
            }

            // Set user information in the session
            req.session.user = user;

            // Redirect to the home page or any other desired page
            res.redirect('/');
        })
        .catch((err) => {
            // Handle any errors that occur during the database query
            res.json({ message: err.message, type: 'danger' });
        });
});

module.exports = router;
