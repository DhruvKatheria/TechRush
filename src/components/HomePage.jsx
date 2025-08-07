import React from 'react';
import { User, MapPin, Gift, Award, Heart, Users, Target } from 'lucide-react';
import homeImage from '../assets/donate_bacha.jpg'; // make sure path is correct

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeImage})`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Optional overlay, remove this div if you want NO overlay at all */}
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6">Transform Lives Through Giving</h1>
            <p className="text-xl mb-8 max-w-3xl">
              Connect with trusted NGOs and make a meaningful impact in your community.
              Every donation matters, every gesture counts.
            </p>
            <button
              onClick={() => setCurrentPage('register')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <Heart className="h-5 w-5" />
              <span>Start Donating</span>
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">How CharityConnect Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">1. Register</h3>
              <p className="text-gray-600">Create your account with email verification for a secure donation experience.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">2. Choose Location</h3>
              <p className="text-gray-600">Select your preferred drop-off location for convenient donation delivery.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">3. Make Request</h3>
              <p className="text-gray-600">Upload photos and describe your donation items for admin review.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">4. Impact Created</h3>
              <p className="text-gray-600">Your donations reach verified NGOs, creating real positive impact.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-indigo-600 mb-2">100+</h3>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Gift className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-600 mb-2">50+</h3>
              <p className="text-gray-600">Donations Processed</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-purple-600 mb-2">4+</h3>
              <p className="text-gray-600">Partner NGOs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
