const DonationRequest = require('../models/DonationRequest');
const User = require('../models/User'); // Assuming User model is available for user details
const NGO = require('../models/NGO'); // Assuming you'll have an NGO model for allocation

// Create a new donation request
const createDonationRequest = async (req, res) => {
  try {
    const { userId, donationType, description, photos } = req.body;

    // Fetch user details to store with the donation request
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newDonationRequest = new DonationRequest({
      userId,
      userName: user.name,
      userEmail: user.email,
      donationType,
      description,
      photos, // Photos are expected as an array of Base64 strings
      status: 'pending',
    });

    await newDonationRequest.save();
    res.status(201).json({ message: 'Donation request submitted successfully!', request: newDonationRequest });
  } catch (error) {
    console.error('Error creating donation request:', error);
    res.status(500).json({ message: 'Server error while submitting donation request.' });
  }
};

// Get all donation requests (for admin dashboard)
const getAllDonationRequests = async (req, res) => {
  try {
    const donationRequests = await DonationRequest.find().sort({ submittedDate: -1 });
    res.status(200).json(donationRequests);
  } catch (error) {
    console.error('Error fetching donation requests:', error);
    res.status(500).json({ message: 'Server error while fetching donation requests.' });
  }
};

// Get donation requests for a specific user
const getUserDonations = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDonations = await DonationRequest.find({ userId: userId }).sort({ submittedDate: -1 });
    res.status(200).json(userDonations);
  } catch (error) {
    console.error('Error fetching user-specific donations:', error);
    res.status(500).json({ message: 'Server error while fetching user donations.' });
  }
};

// Update donation request status (approve/reject)
const updateDonationRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const donationRequest = await DonationRequest.findById(id);
    if (!donationRequest) {
      return res.status(404).json({ message: 'Donation request not found' });
    }

    donationRequest.status = status;
    if (status === 'rejected' && rejectionReason) {
      donationRequest.rejectionReason = rejectionReason;
    } else {
      donationRequest.rejectionReason = undefined; // Clear if not rejected
    }

    await donationRequest.save();
    res.status(200).json({ message: `Donation request ${status} successfully!`, request: donationRequest });
  } catch (error) {
    console.error('Error updating donation request status:', error);
    res.status(500).json({ message: 'Server error while updating donation request status.' });
  }
};

// Allocate donation to an NGO
const allocateDonationToNGO = async (req, res) => {
  try {
    const { id } = req.params;
    const { ngoId, ngoName } = req.body; // ngoName is passed from frontend for convenience

    const donationRequest = await DonationRequest.findById(id);
    if (!donationRequest) {
      return res.status(404).json({ message: 'Donation request not found' });
    }

    // Optionally, verify NGO exists if you have an NGO model
    // const ngo = await NGO.findById(ngoId);
    // if (!ngo) {
    //   return res.status(404).json({ message: 'NGO not found' });
    // }

    donationRequest.allocatedNgo = ngoId;
    donationRequest.allocatedNgoName = ngoName; // Store name for easier display
    donationRequest.status = 'allocated'; // Set status to allocated

    await donationRequest.save();
    res.status(200).json({ message: `Donation allocated to ${ngoName} successfully!`, request: donationRequest });
  } catch (error) {
    console.error('Error allocating donation to NGO:', error);
    res.status(500).json({ message: 'Server error while allocating donation.' });
  }
};

module.exports = {
  createDonationRequest,
  getAllDonationRequests,
  updateDonationRequestStatus,
  allocateDonationToNGO,
  getUserDonations, 
};
