import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import EmergencyContacts from '../components/EmergencyContacts';
import FacilityList from '../components/FacilityList';
import SearchFilters from '../components/SearchFilters';
import VoiceCommand from '../components/VoiceCommand';
import EmergencyIcon from '../components/EmergencyIcon';
import EmergencyMap from '../components/EmergencyMap';

// Mock facility data with coordinates for major Indian cities
const mockFacilities = [
  {
    id: 1,
    name: "Apollo Hospitals",
    address: "21, Greams Lane, Off Greams Road, Chennai",
    status: "available",
    bedsAvailable: 15,
    phone: "+91 44 2829 3333",
    rating: 4.5,
    openHours: "24/7",
    distance: 2.5,
    lat: 13.0674,
    lng: 80.2376
  },
  {
    id: 2,
    name: "Fortis Hospital",
    address: "154/9, Bannerghatta Road, Bengaluru",
    status: "partial",
    bedsAvailable: 5,
    phone: "+91 80 6621 4444",
    rating: 4.2,
    openHours: "24/7",
    distance: 4.1,
    lat: 12.8996,
    lng: 77.5845
  },
  {
    id: 3,
    name: "Max Super Speciality Hospital",
    address: "1, Press Enclave Road, Saket, New Delhi",
    status: "full",
    bedsAvailable: 0,
    phone: "+91 11 4055 4055",
    rating: 4.0,
    openHours: "24/7",
    distance: 6.8,
    lat: 28.5275,
    lng: 77.2229
  },
  {
    id: 4,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Mumbai",
    status: "available",
    bedsAvailable: 12,
    phone: "+91 22 3099 9999",
    rating: 4.7,
    openHours: "24/7",
    distance: 3.2,
    lat: 19.1206,
    lng: 72.8301
  },
  {
    id: 5,
    name: "Medanta The Medicity",
    address: "CH Baktawar Singh Road, Sector 38, Gurugram",
    status: "partial",
    bedsAvailable: 8,
    phone: "+91 124 414 1414",
    rating: 4.6,
    openHours: "24/7",
    distance: 5.4,
    lat: 28.4595,
    lng: 77.0266
  }
];

const Emergency = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchRadius, setSearchRadius] = useState(10);
  const [showMap, setShowMap] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMap = () => setShowMap((prev) => !prev);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        try {
          const response = await fetch('http://localhost:8000/api/facilities');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response was not JSON");
          }
          const data = await response.json();
          setFacilities(data);
        } catch (apiError) {
          console.warn('Using mock data due to API error:', apiError);
          setFacilities(mockFacilities);
        }
      } catch (err) {
        console.error('Error in fetchFacilities:', err);
        setError('Failed to load facilities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const filteredFacilities = facilities.filter(facility => {
    if (selectedStatus === 'all') return true;
    return facility.status === selectedStatus;
  });

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading facilities</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-800 font-sans relative">
      {/* Page Header */}
      <div className="bg-transparent py-12 px-8 border-b border-gray-200 text-center">
        <PageHeader
          title={<span className="text-red-600 text-5xl font-extrabold drop-shadow-xl">Emergency Services</span>}
          subtitle={<span className="text-gray-700 text-lg">Find nearby healthcare facilities and emergency contacts</span>}
        >
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="flex flex-col bg-white p-6 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300">
                <label className="text-3xl font-extrabold text-blue-600 mb-4">Status Filter</label>
                <SearchFilters
                  selectedStatus={selectedStatus}
                  onStatusChange={setSelectedStatus}
                  searchRadius={searchRadius}
                  onRadiusChange={setSearchRadius}
                />
              </div>
              <div className="flex flex-col bg-white p-6 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300">
                <label className="text-3xl font-extrabold text-blue-600 mb-4">Search Radius</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(e.target.value)}
                    className="w-full"
                  />
                  <span className="text-xl font-semibold">{searchRadius} km</span>
                </div>
              </div>
            </div>
          </div>
        </PageHeader>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 space-y-12">
        {/* Voice Command */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-200 rounded-xl shadow-xl p-8 border border-blue-300 animate-fade-in-up">
          <div className="flex items-center gap-6 mb-4">
            <div className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6h13M5 6h.01M5 12h.01M5 18h.01" />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-blue-600 drop-shadow-xl">Voice Command</h2>
          </div>
          <VoiceCommand onCall={handleCall} />
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200 animate-fade-in-up hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-blue-600 drop-shadow-xl mb-6">Emergency Contacts</h2>
          <EmergencyContacts />
        </div>

        {/* Facility List */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200 animate-fade-in-up hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl font-extrabold text-blue-600 drop-shadow-xl mb-6">Available Facilities</h2>
          <FacilityList
            facilities={filteredFacilities}
            selectedStatus={selectedStatus}
            searchRadius={searchRadius}
          />
        </div>

        {/* Embedded Google Map */}
        {showMap && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 animate-fade-in-up hover:scale-105 transition-transform duration-300">
            <EmergencyMap facilities={filteredFacilities} />
          </div>
        )}
      </div>

      {/* Floating Map Toggle Button */}
      <EmergencyIcon onClick={toggleMap} />
    </div>
  );
};

export default Emergency;
