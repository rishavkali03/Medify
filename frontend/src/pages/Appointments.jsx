import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  XMarkIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import DoctorCard from '../components/DoctorCard';

// Enhanced Indian doctors data
const doctorsData = [
  {
    id: 1,
    name: "Dr. Anil Sharma",
    specialization: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM"],
    isAvailable: true,
    consultationFee: "₹1500",
    languages: ["Hindi", "English"],
    hospital: "Apollo Hospitals",
    isDropInAvailable: true,
  },
  {
    id: 2,
    name: "Dr. Priya Mehta",
    specialization: "Dermatologist",
    experience: "12 years",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM"],
    isAvailable: true,
    consultationFee: "₹1200",
    languages: ["Hindi", "English", "Gujarati"],
    hospital: "Fortis Hospital",
    isDropInAvailable: true,
  },
  {
    id: 3,
    name: "Dr. Rajeev Kumar",
    specialization: "Orthopedic",
    experience: "20 years",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    availableSlots: ["09:30 AM", "12:00 PM", "04:00 PM"],
    isAvailable: true,
    consultationFee: "₹1800",
    languages: ["Hindi", "English"],
    hospital: "Max Healthcare",
    isDropInAvailable: false,
  },
  {
    id: 4,
    name: "Dr. Meera Patel",
    specialization: "Pediatrician",
    experience: "10 years",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    availableSlots: ["09:00 AM", "11:30 AM", "02:30 PM"],
    isAvailable: true,
    consultationFee: "₹1000",
    languages: ["Hindi", "English", "Gujarati"],
    hospital: "Kokilaben Hospital",
    isDropInAvailable: true,
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    specialization: "Neurologist",
    experience: "18 years",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    availableSlots: ["10:30 AM", "01:00 PM", "03:30 PM"],
    isAvailable: true,
    consultationFee: "₹2000",
    languages: ["Hindi", "English", "Punjabi"],
    hospital: "Medanta Hospital",
    isDropInAvailable: false,
  },
  {
    id: 6,
    name: "Dr. Ananya Reddy",
    specialization: "Psychiatrist",
    experience: "8 years",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM"],
    isAvailable: true,
    consultationFee: "₹1500",
    languages: ["Hindi", "English", "Telugu"],
    hospital: "Manipal Hospital",
    isDropInAvailable: true,
  },
];

const specializations = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Neurologist",
  "Psychiatrist",
  "Dentist",
];

export default function Appointments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [showFirstTimeOffer, setShowFirstTimeOffer] = useState(true);
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  const ePrescriptions = [
    { id: 1, title: "Prescription #001", date: "2024-11-01" },
    { id: 2, title: "Prescription #002", date: "2024-12-15" },
    { id: 3, title: "Prescription #003", date: "2025-01-20" },
    { id: 4, title: "Prescription #004", date: "2025-02-28" },
    { id: 5, title: "Prescription #005", date: "2025-03-10" },
  ];

  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      selectedSpecialization === 'All' ||
      doctor.specialization === selectedSpecialization
  );

  const handleBookAppointment = (doctor, slot) => {
    const newAppointment = {
      id: Date.now(),
      doctor: doctor,
      slot: slot,
      date: new Date().toISOString().split('T')[0],
      status: 'upcoming',
    };
    setUpcomingAppointments([...upcomingAppointments, newAppointment]);
    setActiveTab('upcoming');
  };

  const handleEmergencyClick = () => {
    navigate('/emergency');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-150 to-blue-200">
      {/* Emergency Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleEmergencyClick}
          className="group flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
        >
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="font-semibold">Emergency</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* First Time User Offer */}
        {showFirstTimeOffer && (
          <div className="relative mb-8 bg-blue-50 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Special Offer for First-Time Users! 🎉
                </h2>
                <p className="mt-2 text-blue-500">
                  Get 20% off on your first consultation
                </p>
              </div>
              <button
                onClick={() => setShowFirstTimeOffer(false)}
                className="p-2 hover:bg-blue-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-300">
              Claim Offer
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {['available', 'upcoming', 'past', 'eprescription'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'available'
                ? 'Available Doctors'
                : tab === 'upcoming'
                ? 'Upcoming Appointments'
                : tab === 'past'
                ? 'Past Appointments'
                : 'E-Prescription'}
            </button>
          ))}
        </div>

        {/* Specialization Filter */}
        {activeTab === 'available' && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedSpecialization === spec
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Available Doctors */}
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
        )}

        {/* Upcoming Appointments */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No upcoming appointments
                </h3>
                <p className="mt-1 text-gray-500">
                  Book an appointment with our specialists.
                </p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={appointment.doctor.image}
                        alt={appointment.doctor.name}
                        className="w-16 h-16 rounded-full ring-2 ring-blue-50"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {appointment.doctor.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {appointment.doctor.specialization}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.doctor.hospital}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span>{appointment.slot}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Past Appointments */}
        {activeTab === 'past' && (
          <div className="space-y-6">
            {pastAppointments.length === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No past appointments
                </h3>
                <p className="mt-1 text-gray-500">
                  Your appointment history will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={appointment.doctor.image}
                        alt={appointment.doctor.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{appointment.doctor.name}</h3>
                        <p className="text-sm text-gray-500">{appointment.doctor.specialization}</p>
                        <p className="text-sm text-gray-500">{appointment.doctor.hospital}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{appointment.date}</span>
                        <span>{appointment.slot}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* E-Prescription */}
        {activeTab === 'eprescription' && (
          <div className="space-y-4">
            {ePrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{prescription.title}</p>
                      <p className="text-xs text-gray-500">{prescription.date}</p>
                    </div>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
