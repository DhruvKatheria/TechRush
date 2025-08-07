import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import DropOffPage from './components/DropOffPage';
import DonatePage from './components/DonatePage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import NGODashboard from './components/NGODashboard';
import Aboutus from './components/Aboutus';
import NGOs from './components/NGOs';
import AdminLoginModal from './components/AdminLoginModal';
import MessageModal from './components/MessageModal';
import './index.css';

const CharityApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('user'); // 'user', 'admin', 'ngo'

  // Admin Modal State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Global Message Modal States
  const [globalModalMessage, setGlobalModalMessage] = useState('');
  const [globalModalType, setGlobalModalType] = useState('alert'); // 'alert', 'confirm', 'prompt'
  const [globalModalConfirmAction, setGlobalModalConfirmAction] = useState(null);
  const [globalModalInputValue, setGlobalModalInputValue] = useState('');

  const handleAdminClick = () => {
    setIsAdminModalOpen(true);
  };

  const handleAdminSuccess = () => {
    setUser({ name: 'Admin' });
    setUserType('admin');
    setCurrentPage('admin');
    setIsAdminModalOpen(false);
  };

  const handleSetCurrentPage = (page) => {
    if (page === 'admin' && (!user || userType !== 'admin')) {
      handleAdminClick();
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={handleSetCurrentPage} user={user} />;
      case 'register':
        return <RegisterPage setCurrentPage={handleSetCurrentPage} setUser={setUser} />;
      case 'login':
        return <LoginPage setCurrentPage={handleSetCurrentPage} setUser={setUser} setUserType={setUserType} />;
      case 'dropoff':
        return (
          <DropOffPage
            setCurrentPage={handleSetCurrentPage}
            user={user}
            setModalMessage={setGlobalModalMessage}
            setModalType={setGlobalModalType}
          />
        );
      case 'donate':
        return (
          <DonatePage
            setCurrentPage={handleSetCurrentPage}
            user={user}
            setModalMessage={setGlobalModalMessage}
            setModalType={setGlobalModalType}
          />
        );
      case 'dashboard':
        return <UserDashboard setCurrentPage={handleSetCurrentPage} user={user} />;
      case 'admin':
        return (
          <AdminDashboard
            setCurrentPage={handleSetCurrentPage}
            user={user}
            setModalMessage={setGlobalModalMessage}
            setModalType={setGlobalModalType}
            setModalConfirmAction={setGlobalModalConfirmAction}
            setModalInputValue={setGlobalModalInputValue}
          />
        );
      case 'ngo':
        return (
          <NGODashboard
            setCurrentPage={handleSetCurrentPage}
            setModalMessage={setGlobalModalMessage}
            setModalType={setGlobalModalType}
          />
        );
      case 'aboutus':
        return (
          <Aboutus
            setCurrentPage={handleSetCurrentPage}
            setModalMessage={setGlobalModalMessage}
            setModalType={setGlobalModalType}
          />
        );
      case 'ngos':
        return (
          <NGOs
            setCurrentPage={handleSetCurrentPage}
            setModalMessage={setGlobalModalMessage}
            setModalType={setGlobalModalType}
          />
        );
      default:
        return <HomePage setCurrentPage={handleSetCurrentPage} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
        user={user}
        userType={userType}
        setUser={setUser}
        setUserType={setUserType}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminSuccess}
      />

      {/* Render page content */}
      {renderPage()}

      {/* Global Message Modal */}
      <MessageModal
        message={globalModalMessage}
        onConfirm={() => {
          if (globalModalConfirmAction && globalModalType === 'prompt') {
            globalModalConfirmAction(globalModalInputValue);
          } else if (globalModalConfirmAction && globalModalType === 'confirm') {
            globalModalConfirmAction();
          }
          setGlobalModalMessage('');
          setGlobalModalConfirmAction(null);
          setGlobalModalInputValue('');
        }}
        onCancel={() => {
          setGlobalModalMessage('');
          setGlobalModalConfirmAction(null);
          setGlobalModalInputValue('');
        }}
        showCancel={globalModalType === 'confirm' || globalModalType === 'prompt'}
        inputPlaceholder={globalModalType === 'prompt' ? 'Enter reason here...' : ''}
        onInputChange={setGlobalModalInputValue}
        inputValue={globalModalInputValue}
      />
    </div>
  );
};

export default CharityApp;