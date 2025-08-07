const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes'); // Import new donation routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for image data

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes); // Use new donation routes

// Test Route (optional)
app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
