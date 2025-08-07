const express = require('express');
const router = express.Router();
const {
  createDonationRequest,
  getAllDonationRequests,
  updateDonationRequestStatus,
  allocateDonationToNGO,
  getUserDonations, // Import the new function
} = require('../controllers/donationController');

// Route to submit a new donation request
router.post('/', createDonationRequest);

// Route to get all donation requests (for admin)
router.get('/', getAllDonationRequests);

// Route to get donations for a specific user
router.get('/user/:userId', getUserDonations); // NEW ROUTE

// Route to update donation request status (approve/reject)
router.patch('/:id/status', updateDonationRequestStatus);

// Route to allocate donation to an NGO
router.patch('/:id/allocate', allocateDonationToNGO);

module.exports = router;