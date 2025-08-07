const mongoose = require('mongoose');

const donationRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  donationType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String, // Base64 or image URL (Cloudinary preferred for prod)
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'allocated'],
    default: 'pending',
  },
  rejectionReason: {
    type: String,
    default: '',
  },
  allocatedNgo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
  },
  allocatedNgoName: {
    type: String,
    default: '',
  },
  submittedDate: {
    type: Date,
    default: Date.now,
  }
},{
  timestamps: true,});

module.exports = mongoose.model('DonationRequest', donationRequestSchema);