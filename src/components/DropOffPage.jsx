import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const DropOffPage = ({ setCurrentPage, user }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  
  const predefinedLocations = [
    'PSK-Mundhwa,Pune',
    'Elpro International School-Chinchwad',
    'Shivaji Nagar Bus-stop',
    'Flames University-Bavdhan',
    'Pavillion Mall'
  ];

  const handleContinue = () => {
    if (selectedLocation || customAddress) {
      alert('Drop-off location saved successfully!');
      setCurrentPage('donate');
    } else {
      alert('Please select or enter a drop-off location.');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Choose Drop-off Location</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Predefined Locations</h3>
            <div className="space-y-3">
              {predefinedLocations.map((location, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-black-50 cursor-pointer">
                  <input
                    type="radio"
                    name="location"
                    value={location}
                    checked={selectedLocation === location}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setCustomAddress('');
                    }}
                    className="text-indigo-600"
                  />
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-black" />
                    <span className="text-black">{location}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Custom Address</h3>
            <textarea
              placeholder="Enter your preferred drop-off address..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24"
              value={customAddress}
              onChange={(e) => {
                setCustomAddress(e.target.value);
                setSelectedLocation('');
              }}
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Why Choose Drop-off Location?</h4>
            <p className="text-blue-700 text-sm">
              Selecting a convenient drop-off location helps us coordinate efficient collection and 
              ensures your donations reach the right NGOs quickly and safely.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentPage('register')}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continue to Donation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropOffPage;
