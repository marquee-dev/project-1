const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors=require('cors')

require('dotenv').config();

const app=express()
const PORT=process.env.PORT || 4000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// Product and Cart Models
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const User=require('./models/User')
// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/cartRoutes'));

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send token to frontend
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'Error occurred', message: err.message });
  }
});

app.post('/signin', async (req, res) => {
    const { name, password } = req.body;
  
    try {
      // Find the freelancer by username
      const user = await User.findOne({ name });
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ error: 'Freelancer not found' });
      }
  
      console.log('User found:', user);
  
      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password comparison result:', isMatch);
      
      if (!isMatch) {
        console.log('Invalid credentials');
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return token as JSON
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  mongoose.connect(process.env.MONGO_URI,{connectTimeoutMS: 30000,socketTimeoutMS: 45000,})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
