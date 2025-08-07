import React, { useState } from 'react';
import { Upload, Gift, X, Check } from 'lucide-react';
import MessageModal from './MessageModal';

const DonatePage = ({ setCurrentPage, user }) => {
  const [donationType, setDonationType] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]); // Each photo: { name, url, base64 }
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('alert'); // 'alert', 'confirm'
  const [modalConfirmAction, setModalConfirmAction] = useState(null);

  const donationTypes = [
    { value: 'clothes', label: 'Clothing & Textiles', icon: '👕' },
    { value: 'food', label: 'Food Items', icon: '🥫' },
    { value: 'books', label: 'Books & Educational', icon: '📚' },
    { value: 'toys', label: 'Toys & Games', icon: '🧸' },
    { value: 'electronics', label: 'Electronics', icon: '💻' },
    { value: 'furniture', label: 'Furniture', icon: '🪑' },
    { value: 'medical', label: 'Medical Supplies', icon: '🏥' },
    { value: 'other', label: 'Other Items', icon: '📦' }
  ];

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [
          ...prev,
          {
            name: file.name,
            url: URL.createObjectURL(file),
            base64: reader.result
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donationType || !description || photos.length === 0) {
      setModalMessage('Please fill all fields and upload at least one photo.');
      setModalType('alert');
      return;
    }

    if (!user || !user.id) {
      setModalMessage('You must be logged in to submit a donation request.');
      setModalType('alert');
      return;
    }

    setLoading(true);

    const payload = {
      userId: user.id,
      donationType,
      description,
      photos: photos.map(p => p.base64)
    };

    try {
      const res = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setModalMessage('Donation request submitted successfully! You will be notified once reviewed.');
        setModalType('alert');
        setTimeout(() => setCurrentPage('dashboard'), 2000);
      } else {
        setModalMessage(data.message || 'Submission failed. Please try again.');
        setModalType('alert');
      }
    } catch (err) {
      console.error(err);
      setModalMessage('An error occurred. Please try again later.');
      setModalType('alert');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Submitted!</h2>
          <p className="text-gray-600 mb-6">Your donation request is being reviewed by our admin team.</p>
          <div className="animate-pulse flex justify-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          </div>
        </div>

        <MessageModal
          message={modalMessage}
          onConfirm={() => setModalMessage('')}
        />
      </div>
    );
  }

  // Form
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Make a Donation Request</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Donation Type */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">What would you like to donate?</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {donationTypes.map((type) => (
                <label
                  key={type.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-indigo-300 ${
                    donationType === type.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="donationType"
                    value={type.value}
                    checked={donationType === type.value}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium text-black">{type.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Upload Photos */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload Photos</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Click to upload photos of your donation items</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Choose Photos
              </label>
            </div>

            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img src={photo.url} alt={photo.name} className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Describe Your Donation</h3>
            <textarea
              placeholder="Please provide details about the items you wish to donate, their condition, quantity, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setCurrentPage('dropoff')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Gift className="h-5 w-5" />
              )}
              <span>{loading ? 'Submitting...' : 'Submit Donation Request'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Global Message Modal */}
      <MessageModal
        message={modalMessage}
        onConfirm={() => setModalMessage('')}
        showCancel={false}
      />
    </div>
  );
};

export default DonatePage;