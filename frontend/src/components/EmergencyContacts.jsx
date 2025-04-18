import React from 'react';
import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const EmergencyContacts = () => {
  const emergencyContacts = [
    { name: "Emergency Hotline", number: "911", description: "24/7 Emergency Services" },
    { name: "Ambulance", number: "123", description: "Medical Emergency Transport" },
    { name: "Poison Control", number: "1-800-222-1222", description: "24/7 Poison Emergency" },
    { name: "Mental Health Crisis", number: "988", description: "24/7 Mental Health Support" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contacts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <PhoneIcon className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
            </div>
            <a 
              href={`tel:${contact.number}`}
              className="mt-2 inline-flex items-center text-red-500 hover:text-red-600"
            >
              <span className="text-lg font-semibold">{contact.number}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts; 