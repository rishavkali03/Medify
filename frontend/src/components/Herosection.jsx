import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeartbeat,
  FaUserMd,
  FaStethoscope,
  FaBriefcaseMedical,
} from "react-icons/fa";
import HeroImage1 from "../assets/hero1.png";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold text-blue-500 drop-shadow-lg">
            Empower Your Health <br />
            With Smart Care
          </h1>
          <p className="text-gray-800 text-xl font-medium leading-relaxed mb-4">
            "Health is not just about the absence of illness. It's about finding
            balance, vitality, and joy in everyday life. Let's build that future together."
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            AI-powered answers. Early intervention. All in one place.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{
                scale: 1.02,
                backgroundColor: "#2563eb",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigate("/appointments")}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              Book Appointment
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.015,
                backgroundColor: "#b91c1c",
                boxShadow: "0 6px 18px rgba(185, 28, 28, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
              onClick={() => navigate("/emergency")}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
            >
              Emergency
            </motion.button>
          </motion.div>

          {/* Count-Up Stats */}
          <div className="flex gap-8 text-blue-600 pt-6">
            <div>
              <p className="text-2xl font-bold">
                <CountUp end={50000} duration={2} separator="," />+
              </p>
              <p className="text-sm">Happy Patients</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                <CountUp end={350} duration={2} />+
              </p>
              <p className="text-sm">Expert Doctors</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                <CountUp end={98} duration={2} />%
              </p>
              <p className="text-sm">Success Rate</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 pt-6 text-blue-600 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-blue-800 transition-all" />
            <FaTwitter className="cursor-pointer hover:text-blue-400 transition-all" />
            <FaInstagram className="cursor-pointer hover:text-pink-500 transition-all" />
            <FaYoutube className="cursor-pointer hover:text-red-600 transition-all" />
          </div>
        </motion.div>

        {/* Right: Image & Icons */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          <motion.div className="absolute top-4 left-10 text-blue-500 animate-bounce-slow">
            <FaHeartbeat size={35} />
          </motion.div>
          <motion.div className="absolute bottom-6 right-16 text-cyan-500 animate-bounce-slow delay-200">
            <FaStethoscope size={35} />
          </motion.div>
          <motion.div className="absolute top-20 right-10 text-indigo-500 animate-bounce-slow delay-300">
            <FaUserMd size={35} />
          </motion.div>
          <motion.div className="absolute bottom-10 left-6 text-blue-400 animate-bounce-slow delay-500">
            <FaBriefcaseMedical size={36} />
          </motion.div>

          {/* Doctor Image */}
          <div className="p-1 bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-100 rounded-3xl shadow-xl transition-all duration-500">
            <img
              src={HeroImage1}
              alt="Doctor"
              className="rounded-2xl w-full max-w-sm object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
