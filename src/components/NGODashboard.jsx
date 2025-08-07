import React, { useState } from 'react';
import { Check } from 'lucide-react';

const NGODashboard = ({ setCurrentPage }) => {
  const [allocatedDonations, setAllocatedDonations] = useState([
    {
      id: 1,
      type: 'Clothing',
      items: 'Winter clothes, shoes',
      donorName: 'John Doe',
      allocatedDate: '2024-01-16',
      status: 'allocated',
      quantity: '2 bags'
    },
    {
      id: 2,
      type: 'Books',
      items: 'Educational books',
      donorName: 'Jane Smith',
      allocatedDate: '2024-01-15',
      status: 'received',
      quantity: '1 box'
    }
  ]);

  const confirmReceipt = (donationId) => {
    setAllocatedDonations(allocatedDonations.map(d =>
      d.id === donationId ? { ...d, status: 'received' } : d
    ));
    alert('Thank you for confirming receipt! Admin has been notified.');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">NGO Dashboard</h2>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold">Total Allocations</h3>
              <p className="text-3xl font-bold">{allocatedDonations.length}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold">Pending Pickup</h3>
              <p className="text-3xl font-bold">{allocatedDonations.filter(d => d.status === 'allocated').length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold">Received</h3>
              <p className="text-3xl font-bold">{allocatedDonations.filter(d => d.status === 'received').length}</p>
            </div>
          </div>

          {/* Allocated Donations */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Allocated Donations</h3>
            <div className="space-y-4">
              {allocatedDonations.map((donation) => (
                <div key={donation.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{donation.type} Donation</h4>
                      <p className="text-gray-600">From: {donation.donorName}</p>
                      <p className="text-gray-500 text-sm">Allocated: {donation.allocatedDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      donation.status === 'allocated'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {donation.status === 'allocated' ? 'Pending Pickup' : 'Received'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Items</p>
                      <p className="font-medium">{donation.items}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium">{donation.quantity}</p>
                    </div>
                  </div>

                  {donation.status === 'allocated' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm mb-3">
                        Please confirm once you have received these items from the donor.
                      </p>
                      <button
                        onClick={() => confirmReceipt(donation.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1"
                      >
                        <Check className="h-4 w-4" />
                        <span>Confirm Receipt</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;