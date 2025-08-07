import React, { useState, useEffect } from 'react';
import { Gift, Check, X, Truck, Clock } from 'lucide-react';
import MessageModal from './MessageModal'; // Import the MessageModal

const UserDashboard = ({ setCurrentPage, user }) => {
  const [userDonations, setUserDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (user && user.id) {
      fetchUserDonations();
    } else {
      setLoading(false);
      // Optionally, redirect to login or show a message if not logged in
      setModalMessage('Please log in to view your dashboard.');
    }
  }, [user]); // Re-fetch when user object changes

  const fetchUserDonations = async () => {
    setLoading(true);
    try {
      // Assuming a new API endpoint to get user-specific donations
      // You'll need to add this to your backend donationRoutes and donationController
      const response = await fetch(`http://localhost:5000/api/donations/user/${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setUserDonations(data);
      } else {
        setModalMessage(data.message || 'Failed to fetch your donation history.');
      }
    } catch (error) {
      console.error('Error fetching user donations:', error);
      setModalMessage('An error occurred while fetching your donations.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'approved':
        return <Check className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-600" />;
      case 'allocated':
        return <Truck className="h-5 w-5 text-blue-600" />;
      default:
        return <Gift className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'allocated':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-4 text-gray-600">Loading your donations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Donation Dashboard</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">My Donation Requests</h3>
            <div className="space-y-4">
              {userDonations.length === 0 ? (
                <p className="text-gray-600 text-center">You haven't submitted any donation requests yet. <button onClick={() => setCurrentPage('donate')} className="text-indigo-600 hover:underline">Start donating!</button></p>
              ) : (
                userDonations.map((request) => (
                  <div key={request._id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{request.donationType} Donation</h4>
                        <p className="text-gray-600">Description: {request.description}</p>
                        <p className="text-gray-500 text-sm">Submitted: {new Date(request.submittedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {request.status === 'rejected' && request.rejectionReason && (
                      <div className="mb-4 text-red-700 text-sm">
                        Rejection Reason: {request.rejectionReason}
                      </div>
                    )}
                    {request.status === 'allocated' && request.allocatedNgoName && (
                      <div className="mb-4 text-blue-700 text-sm">
                        Allocated to: {request.allocatedNgoName}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <MessageModal
        message={modalMessage}
        onConfirm={() => setModalMessage('')}
      />
    </div>
  );
};

export default UserDashboard;