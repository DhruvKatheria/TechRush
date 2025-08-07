// Navigation.jsx
import React from 'react';
import { Heart } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, user, userType, setUser, setUserType }) => {
  const handleLogout = () => {
    setUser(null);
    setUserType('user');
    setCurrentPage('home');
  };

  return (
    <nav className="bg-white shadow-lg border-b-4 border-indigo-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-indigo-800">CharityConnect</span>
          </div>

          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <button onClick={() => setCurrentPage('home')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'home' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>Home</button>
                <button onClick={() => setCurrentPage('ngos')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'ngos' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>NGOs</button>
                <button onClick={() => setCurrentPage('aboutus')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'aboutus' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>About Us</button>
                <button onClick={() => setCurrentPage('register')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Register</button>
                <button onClick={() => setCurrentPage('login')} className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">Login</button>
                <button onClick={() => setCurrentPage('admin')} className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">Admin</button>
              </>
            ) : (
              <>
                {userType === 'user' && (
                  <>
                    <button onClick={() => setCurrentPage('dashboard')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>Dashboard</button>
                    <button onClick={() => setCurrentPage('ngos')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'ngos' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>NGOs</button>
                    <button onClick={() => setCurrentPage('donate')} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Donate Now</button>
                  </>
                )}
                {userType === 'admin' && (
                  <>
                    <button onClick={() => setCurrentPage('admin')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>Admin Panel</button>
                    <button onClick={() => setCurrentPage('ngos')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'ngos' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>NGOs</button>
                  </>
                )}
                {userType === 'ngo' && (
                  <>
                    <button onClick={() => setCurrentPage('ngo')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'ngo' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>NGO Dashboard</button>
                    <button onClick={() => setCurrentPage('ngos')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'ngos' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>All NGOs</button>
                  </>
                )}
                <button onClick={() => setCurrentPage('aboutus')} className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 'aboutus' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'}`}>About Us</button>
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition-colors">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
 


