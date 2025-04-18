import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom component to handle map centering
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const EmergencyMap = ({ facilities }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate distance between two points in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'available':
        return 'green';
      case 'partial':
        return 'yellow';
      case 'full':
        return 'red';
      default:
        return 'blue';
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Error Loading Map</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  // Default to India if no user location
  const center = userLocation || { lat: 20.5937, lng: 78.9629 };

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <ChangeView center={[center.lat, center.lng]} zoom={13} />
        
        {/* OpenStreetMap tiles with custom style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              className: 'custom-marker user-location',
              html: '<div class="marker-pin user"></div>',
              iconSize: [30, 42],
              iconAnchor: [15, 42],
            })}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Facility markers */}
        {facilities.map((facility) => {
          const distance = userLocation 
            ? calculateDistance(userLocation.lat, userLocation.lng, facility.lat, facility.lng)
            : null;

          return (
            <Marker
              key={facility.id}
              position={[facility.lat, facility.lng]}
              icon={L.divIcon({
                className: `custom-marker ${getMarkerColor(facility.status)}`,
                html: `<div class="marker-pin ${getMarkerColor(facility.status)}"></div>`,
                iconSize: [30, 42],
                iconAnchor: [15, 42],
              })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{facility.name}</h3>
                  <p className="text-gray-600">{facility.address}</p>
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Status:</span> {facility.status}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Beds Available:</span> {facility.bedsAvailable}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {facility.phone}
                    </p>
                    {distance && (
                      <p className="text-sm">
                        <span className="font-medium">Distance:</span> {distance.toFixed(1)} km
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <style jsx global>{`
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          position: relative;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-pin::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }
        .marker-pin.green {
          background-color: #10B981;
        }
        .marker-pin.green::after {
          border-top: 10px solid #10B981;
        }
        .marker-pin.yellow {
          background-color: #F59E0B;
        }
        .marker-pin.yellow::after {
          border-top: 10px solid #F59E0B;
        }
        .marker-pin.red {
          background-color: #EF4444;
        }
        .marker-pin.red::after {
          border-top: 10px solid #EF4444;
        }
        .marker-pin.blue {
          background-color: #3B82F6;
        }
        .marker-pin.blue::after {
          border-top: 10px solid #3B82F6;
        }
        .marker-pin.user {
          background-color: #8B5CF6;
          border: 2px solid white;
          box-shadow: 0 0 0 2px #8B5CF6;
        }
        .marker-pin.user::after {
          border-top: 10px solid #8B5CF6;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default EmergencyMap;



