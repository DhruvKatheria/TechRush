import React, { useState } from 'react';
import { Heart, Users, GraduationCap, Droplets, Leaf, MapPin, Star, Lightbulb } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const NGOsPage = () => {
  const [selectedNGO, setSelectedNGO] = useState(null);

  const ngos = [
    {
      id: 1,
      name: "Hope Foundation",
      category: "Human Welfare",
      icon: GraduationCap,
      location: "Baner, Pune, Maharashtra",
      rating: "4.8",
      totalDonations: "1000+ items",
      beneficiaries: "50+ people",
      description: "Hope Foundation is dedicated to uplifting lives through compassion, support, and community empowerment.",
      mission: "Our mission is to create a better, more equitable world by addressing the needs of the underprivileged and promoting holistic well-being for all.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      contact: {
        email: "info@hopeforchildren.org",
        phone: "+91 98765 43210",
        website: "https://hopefoundation.org"
      },
    },
    {
      id: 2,
      name: "Light for Lives",
      category: "Water & Sanitation",
      icon: Lightbulb,
      location: "Kalyani Nagar, Pune, Maharashtra",
      rating: "4.3",
      totalDonations: "380+ items",
      beneficiaries: "250+ people",
      description: "Light for Lives is an NGO committed to bringing hope, dignity, and opportunity to underprivileged communities.",
      mission: "Our mission is to empower individuals through education, healthcare, and sustainable support.",
      imageUrl: "https://images.unsplash.com/photo-1476900164809-ff19b8ae5968?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      contact: {
        email: "contact@lightforlives.org",
        phone: "+91 87654 32109",
        website: "https://lightforlives.org"
      },
    },
    {
      id: 3,
      name: "Green Earth Foundation",
      category: "Environment & Sustainability",
      icon: Leaf,
      location: "Kondhwa, Pune, Maharashtra",
      rating: 4.2,
      totalDonations: "500+ items",
      beneficiaries: "20+ locations",
      description: "Committed to environmental conservation through tree plantation, waste management, and sustainable farming practices.",
      mission: "To create a sustainable future through environmental awareness and community-driven conservation efforts.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      contact: {
        email: "hello@greenearthfoundation.org",
        phone: "+91 76543 21098",
        website: "https://greenearthfoundation.org"
      },
    },
    {
      id: 4,
      name: "Senior Care Society",
      category: "Elderly Care & Support",
      icon: Heart,
      location: "Katraj, Pune, Maharashtra",
      rating: 4.6,
      totalDonations: "250 items",
      beneficiaries: "80+ seniors",
      description: "Providing comprehensive care, medical support, and companionship to elderly citizens who need assistance.",
      mission: "To ensure dignity, respect, and quality care for senior citizens in their golden years.",
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      contact: {
        email: "care@seniorcaresociety.org",
        phone: "+91 65432 10987",
        website: "https://seniorcaresociety.org"
      },
    }
  ];
  
  const handleDonate = (ngo) => {
    alert(`Register Before Donating.`);
  };

  const NGOCard = ({ ngo, onClick }) => {
    const IconComponent = ngo.icon;
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="h-48 relative">
          <img 
            src={ngo.imageUrl} 
            alt={`${ngo.name} - ${ngo.category}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <IconComponent className="h-8 w-8 mb-2" aria-hidden="true" />
            <h3 className="text-xl font-bold">{ngo.name}</h3>
            <p className="text-white opacity-90">{ngo.category}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-gray-500" aria-hidden="true" />
              <span className="text-sm text-gray-600">{ngo.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden="true" />
              <span className="text-sm font-medium text-black">{ngo.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{ngo.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">Total Donations</p>
              <p className="font-semibold text-indigo-600">{ngo.totalDonations}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Beneficiaries</p>
              <p className="font-semibold text-green-600">{ngo.beneficiaries}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onClick(ngo)}
              className="flex-1 bg-[#00AAE4] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NGOModal = ({ ngo, onClose }) => {
    if (!ngo) return null;
    const IconComponent = ngo.icon;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        aria-modal="true"
        role="dialog"
      >
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="sticky top-0 bg-[#00AAE4] text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <IconComponent className="h-12 w-12" aria-hidden="true" />
                <div>
                  <h2 className="text-2xl font-bold">{ngo.name}</h2>
                  <p className="text-indigo-100">{ngo.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-2xl"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-black">About {ngo.name}</h3>
              <p className="text-black mb-6">{ngo.mission}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
              <ContactItem icon={<MapPin />} label="Location" value={ngo.location} />
              <ContactItem icon={<EnvelopeIcon />} label="Email" value={ngo.contact.email} />
              <ContactItem icon={<PhoneIcon />} label="Phone" value={ngo.contact.phone} />
              {ngo.contact.website && (
                <ContactItem
                  icon={<GlobeIcon />}
                  label="Website"
                  value={<a href={ngo.contact.website} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">{ngo.contact.website}</a>}
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatItem label="Total Donations" value={ngo.totalDonations} color="indigo" />
              <StatItem label="Beneficiaries" value={ngo.beneficiaries} color="green" />
              <StatItem label="Rating" value={`${ngo.rating}/5`} color="yellow" />
            </div>
            <div className="flex justify-center space-x-4 pt-6 border-t">
              <button
                onClick={onClose}
                className="border border-gray-300 text-black px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
      <div className="bg-indigo-100 p-2 rounded-full">
        {React.cloneElement(icon, { className: "h-5 w-5 text-black", 'aria-hidden': true })}
      </div>
      <div>
        <p className="font-semibold text-black">{label}</p>
        <p className="text-black">{value}</p>
      </div>
    </div>
  );

  const StatItem = ({ label, value, color }) => (
    <div className={`text-center p-4 bg-${color}-50 rounded-lg`}>
      <p className="text-sm text-black">{label}</p>
      <p className={`text-xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );

  const EnvelopeIcon = () => (
  <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
  </svg>
);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#00AAE4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Users className="h-16 w-16 mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-4xl font-bold mb-4">Our Partner NGOs</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Discover verified non-profit organizations making real impact in communities. Every NGO is thoroughly vetted.
          </p>
        </div>
      </div>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-black">Featured NGOs</h2>
            <p className="text-black max-w-2xl mx-auto">
              These organizations have been carefully selected based on impact, transparency, and commitment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {ngos.map((ngo) => (
              <NGOCard key={ngo.id} ngo={ngo} onClick={setSelectedNGO} />
            ))}
          </div>
        </div>
      </div>
      {selectedNGO && (
        <NGOModal ngo={selectedNGO} onClose={() => setSelectedNGO(null)} />
      )}
    </div>
  );
};

export default NGOsPage;