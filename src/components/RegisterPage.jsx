import React, { useState } from 'react';

const RegisterPage = ({ setCurrentPage, setUser }) => {
  // State to manage form data for registration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // State for loading and error messages to provide better user feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // A function to handle logging in the newly registered user
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
        setUser(data.user);
        setCurrentPage('dropoff');
      } else {
        setIsError(true);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Login error after registration:', error);
      setIsError(true);
      setMessage('Failed to log in automatically. Please try logging in manually.');
    }
  };

  // Function to handle the registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        
        // After successful registration, immediately attempt to log in the user
        await handleLogin(formData.email, formData.password);
      } else {
        setIsError(true);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setIsError(true);
      setMessage('Something went wrong during registration. Please check your network and server.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen py-12 bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Join Our Community</h2>
        
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
