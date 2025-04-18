import React from 'react';

const SearchFilters = ({ selectedStatus, onStatusChange, searchRadius, onRadiusChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Facility Status
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Facilities</option>
            <option value="available">Available</option>
            <option value="partial">Limited Capacity</option>
            <option value="full">Full</option>
          </select>
        </div>

        <div>
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius (km)
          </label>
          <select
            id="radius"
            value={searchRadius}
            onChange={(e) => onRadiusChange(Number(e.target.value))}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={15}>15 km</option>
            <option value={20}>20 km</option>
            <option value={25}>25 km</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters; 