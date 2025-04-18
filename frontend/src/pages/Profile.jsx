import { useState } from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import PageHeader from '../components/PageHeader';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country',
    bloodGroup: 'O+',
    allergies: 'None',
    medications: 'None',
    conditions: 'None'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Save to backend if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-150 to-blue-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="My Profile"
          subtitle="Manage your personal information and health details"
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <UserCircleIcon className="h-32 w-32 text-gray-300" />
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-500">{profileData.email}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Full Name', key: 'name' },
                      { label: 'Email', key: 'email' },
                      { label: 'Phone', key: 'phone' },
                      { label: 'Address', key: 'address' },
                      { label: 'Blood Group', key: 'bloodGroup' },
                      { label: 'Allergies', key: 'allergies' },
                      { label: 'Medications', key: 'medications' },
                      { label: 'Medical Conditions', key: 'conditions' }
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                          type="text"
                          value={profileData[key]}
                          onChange={(e) =>
                            setProfileData({ ...profileData, [key]: e.target.value })
                          }
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(profileData).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700">
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      <p className="mt-1 text-lg text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
