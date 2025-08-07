import React, { useState, useEffect } from 'react';
import { Check, X, Eye } from 'lucide-react';
import MessageModal from './MessageModal'; // Import the new MessageModal

const AdminDashboard = ({ setCurrentPage }) => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [ngos, setNgos] = useState([
    // Mock NGOs for now, ideally fetched from backend as well
    {
      _id: '60d0fe4f3b5e1b0015f8c8c1', // Use _id to match MongoDB ObjectId
      name: 'Hope Foundation',
      email: 'contact@hopefoundation.org',
      focus: 'Education & Child Welfare',
      verified: true
    },
    {
      _id: '60d0fe4f3b5e1b0015f8c8c2',
      name: 'Care International',
      email: 'info@careinternational.org',
      focus: 'Poverty Alleviation',
      verified: true
    }
  ]);

  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('alert'); // 'alert' or 'confirm'
  const [modalConfirmAction, setModalConfirmAction] = useState(null);
  const [modalInputValue, setModalInputValue] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);

  // Fetch donation requests on component mount
  useEffect(() => {
    fetchDonationRequests();
  }, []);

  const fetchDonationRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/donations');
      const data = await response.json();
      if (response.ok) {
        setDonationRequests(data);
      } else {
        setModalMessage(data.message || 'Failed to fetch donation requests.');
        setModalType('alert');
      }
    } catch (error) {
      console.error('Error fetching donation requests:', error);
      setModalMessage('An error occurred while fetching donation requests.');
      setModalType('alert');
    }
  };

  const handleRequestAction = async (requestId, action) => {
    let reason = '';
    if (action === 'rejected') {
      // Use modal for rejection reason
      setModalMessage('Please provide a reason for rejection:');
      setModalType('prompt');
      setModalInputValue(''); // Clear previous input
      setModalConfirmAction(() => async (input) => {
        reason = input;
        if (!reason) {
          setModalMessage('Rejection reason cannot be empty.');
          setModalType('alert');
          return;
        }
        await sendRequestStatusUpdate(requestId, action, reason);
        setModalMessage(''); // Close modal
      });
      return;
    }
    await sendRequestStatusUpdate(requestId, action, reason);
  };

  const sendRequestStatusUpdate = async (requestId, status, reason = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/donations/${requestId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, rejectionReason: reason }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage(`Donation request ${status} successfully!`);
        setModalType('alert');
        fetchDonationRequests(); // Refresh list
      } else {
        setModalMessage(data.message || `Failed to ${status} donation request.`);
        setModalType('alert');
      }
    } catch (error) {
      console.error(`Error updating donation request status to ${status}:`, error);
      setModalMessage('An error occurred while updating the request status.');
      setModalType('alert');
    }
  };

  const allocateToNGO = async (requestId, ngoId) => {
    const ngo = ngos.find(n => n._id === ngoId);
    if (!ngo) {
      setModalMessage('Selected NGO not found.');
      setModalType('alert');
      return;
    }

    setModalMessage(`Are you sure you want to allocate this donation to ${ngo.name}?`);
    setModalType('confirm');
    setModalConfirmAction(() => async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/donations/${requestId}/allocate`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ngoId, ngoName: ngo.name }),
        });

        const data = await response.json();

        if (response.ok) {
          setModalMessage(`Donation allocated to ${ngo.name}. NGO has been notified.`);
          setModalType('alert');
          fetchDonationRequests(); // Refresh list
        } else {
          setModalMessage(data.message || `Failed to allocate donation to ${ngo.name}.`);
          setModalType('alert');
        }
      } catch (error) {
        console.error('Error allocating donation to NGO:', error);
        setModalMessage('An error occurred while allocating the donation.');
        setModalType('alert');
      } finally {
        setModalMessage(''); // Close modal
      }
    });
  };

  const openPhotoModal = (photos) => {
    setCurrentPhotos(photos);
    setShowPhotoModal(true);
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
    setCurrentPhotos([]);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h2>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold">Total Requests</h3>
              <p className="text-3xl font-bold">{donationRequests.length}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold">Pending</h3>
              <p className="text-3xl font-bold">{donationRequests.filter(r => r.status === 'pending').length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold">Approved</h3>
              <p className="text-3xl font-bold">{donationRequests.filter(r => r.status === 'approved').length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold">Partner NGOs</h3>
              <p className="text-3xl font-bold">{ngos.length}</p>
            </div>
          </div>

          {/* Donation Requests */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Donation Requests</h3>
            <div className="space-y-4">
              {donationRequests.length === 0 ? (
                <p className="text-gray-600 text-center">No donation requests to display.</p>
              ) : (
                donationRequests.map((request) => (
                  <div key={request._id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{request.donationType} Donation</h4>
                        <p className="text-gray-600">From: {request.userName} ({request.userEmail})</p>
                        <p className="text-gray-500 text-sm">Submitted: {new Date(request.submittedDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${request.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                        ${request.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                        ${request.status === 'allocated' ? 'bg-blue-100 text-blue-800' : ''}
                      `}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="font-medium">{request.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Photos</p>
                        <button
                          onClick={() => openPhotoModal(request.photos)}
                          className="text-indigo-600 hover:underline flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View {request.photos.length} Photos</span>
                        </button>
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

                    {request.status === 'pending' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleRequestAction(request._id, 'approved')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                        >
                          <Check className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRequestAction(request._id, 'rejected')}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                        <select
                          onChange={(e) => e.target.value && allocateToNGO(request._id, e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={request.allocatedNgo || ''} // Set current value if already allocated
                        >
                          <option value="">Allocate to NGO</option>
                          {ngos.map(ngo => (
                            <option key={ngo._id} value={ngo._id}>{ngo.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* NGO Management (remains largely the same, but NGOs should also be fetched from backend) */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Partner NGOs</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {ngos.map((ngo) => (
                <div key={ngo._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{ngo.name}</h4>
                      <p className="text-gray-600">{ngo.email}</p>
                      <p className="text-gray-500 text-sm">{ngo.focus}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Message Modal */}
      <MessageModal
        message={modalMessage}
        onConfirm={() => {
          if (modalConfirmAction && modalType === 'prompt') {
            modalConfirmAction(modalInputValue);
          } else if (modalConfirmAction && modalType === 'confirm') {
            modalConfirmAction();
          }
          setModalMessage('');
          setModalConfirmAction(null);
          setModalInputValue('');
        }}
        onCancel={() => {
          setModalMessage('');
          setModalConfirmAction(null);
          setModalInputValue('');
        }}
        showCancel={modalType === 'confirm' || modalType === 'prompt'}
        inputPlaceholder={modalType === 'prompt' ? "Enter reason here..." : ""}
        onInputChange={setModalInputValue}
        inputValue={modalInputValue}
      />

      {/* Photo Viewer Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-auto relative">
            <button
              onClick={closePhotoModal}
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Donation Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {currentPhotos.length > 0 ? (
                currentPhotos.map((photoBase64, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={photoBase64}
                      alt={`Donation Photo ${index + 1}`}
                      className="w-full h-48 object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/e0e0e0/808080?text=Image+Error"; }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">No photos available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;