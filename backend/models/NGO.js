const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'], // Basic email validation
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  focusAreas: [ // Array of strings for areas like 'Education', 'Health', 'Environment'
    {
      type: String,
      trim: true,
    }
  ],
  description: {
    type: String,
    trim: true,
  },
  verified: { // To indicate if the NGO has been verified by an admin
    type: Boolean,
    default: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('NGO', ngoSchema);