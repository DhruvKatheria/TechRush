import React, { useState, useEffect } from 'react';
import { X, Lock, AlertTriangle } from 'lucide-react';

const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'admin123'; // You can change this to your desired password
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 60; // 60 seconds

  useEffect(() => {
    let timer;
    if (isLocked && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isLocked) {
      setIsLocked(false);
      setAttempts(0);
      setError('');
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isLocked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Too many attempts. Try again in ${timeLeft} seconds.`);
      return;
    }

    if (password === ADMIN_PASSWORD) {
      // Success
      onSuccess();
      resetModal();
    } else {
      // Wrong password
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setTimeLeft(LOCKOUT_TIME);
        setError(`Too many failed attempts. Try again in ${LOCKOUT_TIME} seconds.`);
      } else {
        setError(`Incorrect password. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
      setPassword('');
    }
  };

  const resetModal = () => {
    setPassword('');
    setAttempts(0);
    setIsLocked(false);
    setTimeLeft(0);
    setError('');
    onClose();
  };

  const handleClose = () => {
    resetModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Lock className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Admin Access</h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter the admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {isLocked && timeLeft > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                Account locked. Retry in <span className="font-bold">{timeLeft}</span> seconds
              </p>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLocked || !password.trim()}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLocked ? `Locked (${timeLeft}s)` : 'Access Admin'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Attempts: {attempts}/{MAX_ATTEMPTS}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;