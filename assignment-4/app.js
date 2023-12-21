const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB (replace 'your-database-uri' and 'your-database-name' with your actual MongoDB URI and database name)
mongoose.connect("mongodb+srv://ayeshasp21:hello@cluster0.jfuiihh.mongodb.net/session", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database!');
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema);

app.use(session({
  secret: 'ayeshamubashirayesha',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

// Registration route
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('Username is already taken. Please choose a different one.');
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    console.log('User registered:', newUser);

    res.send('Registration successful! You can now log in.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Routes
app.get('/', isAuthenticated, (req, res) => {
  res.send('Welcome to the protected page!');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Set the session
      req.session.userId = user._id;
      res.redirect('/');
    } else {
      res.send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
