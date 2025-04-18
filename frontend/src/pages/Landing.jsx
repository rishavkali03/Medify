// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom';
import doctorImage from '../assets/Screenshot.png'; // <-- Using image from assets

const Landing = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate('/appointments');
  };

  return (
    <div className="flex items-center justify-between px-10 py-20 bg-[#5B6FFF] text-white h-screen">
      <div className="max-w-xl space-y-6">
        <h1 className="text-5xl font-bold leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar1"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="avatar2"
            />
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://randomuser.me/api/portraits/women/58.jpg"
              alt="avatar3"
            />
          </div>
          <p className="text-sm">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <button
          onClick={handleAppointmentClick}
          className="mt-4 bg-white text-[#5B6FFF] px-6 py-3 rounded-full font-semibold text-sm shadow hover:shadow-lg transition"
        >
          Book appointment →
        </button>
      </div>

      <div className="hidden md:block">
        <img
          src={doctorImage}
          alt="Trusted Doctors"
          className="h-[500px] object-contain"
        />
      </div>
    </div>
  );
};

export default Landing;
