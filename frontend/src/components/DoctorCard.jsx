import {
  CalendarIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const availableSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const handleBooking = () => {
    if (selectedSlot) {
      onBookAppointment(doctor, selectedSlot);
      setShowBookingModal(false);
      setSelectedSlot(null);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-72 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50" />

        <div className="relative p-6">
          <div className="absolute top-4 right-4">
            <span className="flex items-center space-x-1 text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Available</span>
            </span>
          </div>

          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-2 bottom-0 flex items-center bg-white shadow-md rounded-full px-2 py-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="ml-1 text-xs font-semibold text-gray-600">
                {doctor.rating || '4.8'}
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {doctor.hospital || doctor.address}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span className="inline-block text-xs bg-blue-50 text-blue-500 px-3 py-1 rounded-full font-medium">
                {doctor.specialization || doctor.specialties?.[0]}
              </span>
              <span className="inline-block text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-medium">
                {doctor.experience || '10+ years'}
              </span>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-px bg-gray-100 mt-4">
          <button
            onClick={() => setShowBookingModal(true)}
            className="flex items-center justify-center space-x-2 py-4 bg-white hover:bg-blue-50 transition-colors text-sm font-medium text-blue-500"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Book Now</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-4 bg-white hover:bg-blue-50 transition-colors text-sm font-medium text-blue-500">
            <UserIcon className="w-4 h-4" />
            <span>View Profile</span>
          </button>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full m-4 p-6"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full ring-2 ring-blue-50"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {doctor.specialization || doctor.specialties?.[0]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {doctor.hospital || doctor.address}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Available Time Slots
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedSlot === slot
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {slot}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="font-semibold text-gray-900">
                    ₹{doctor.consultationFee || '1500'}
                  </span>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedSlot}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    selectedSlot
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {selectedSlot ? 'Confirm Booking' : 'Select a Time Slot'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DoctorCard;
