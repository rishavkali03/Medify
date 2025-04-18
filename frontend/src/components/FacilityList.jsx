import React from 'react';
import { PhoneIcon, MapPinIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const statusColors = {
  available: 'bg-green-100 text-green-800',
  partial: 'bg-yellow-100 text-yellow-800',
  full: 'bg-red-100 text-red-800'
};

const statusIcons = {
  available: '🟢',
  partial: '🟡',
  full: '🔴'
};

const FacilityList = ({ facilities, selectedStatus, searchRadius }) => {
  const filteredFacilities = facilities.filter(facility => 
    selectedStatus === 'all' || facility.status === selectedStatus
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Nearby Healthcare Facilities</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4" />
          <span>Within {searchRadius} km</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((facility, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-800">{facility.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{facility.address}</p>
              </div>
              <span className="text-2xl">{statusIcons[facility.status]}</span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ClockIcon className="h-4 w-4" />
                <span>{facility.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span>{facility.rating} ({facility.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Beds Available: {facility.beds}</span>
              </div>
            </div>

            <a 
              href={`tel:${facility.phone}`}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>Call {facility.phone}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityList; 