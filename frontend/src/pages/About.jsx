import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { PiChatCircleText, PiHeartbeatFill, PiCalendarCheckFill, PiChartLineFill, PiSirenFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "../components/ui/sparkles";
import avatar from "../assets/avatar-placeholder.png"; // Use your placeholder avatar

const developers = [
  
  {
    name: "Rishov Chakraborty",
    desc: " Team Lead , Backend King & database Ninja.",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Rishav Kali",
    desc: "The creative lead and UI perfectionist",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Poulami Das",
    desc: "Queen of GenAI, Machine Learning, and Seamless Deployments.",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Koyel Das",
    desc: "Data cruncher and smart feature builder.",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
];

const features = [
  {
    name: "Chatbot",
    icon: <PiChatCircleText size={40} />,
    bg: "from-purple-200 to-purple-400",
    link: "/chatbot",
  },
  {
    name: "Quick Checkup",
    icon: <PiHeartbeatFill size={40} />,
    bg: "from-pink-200 to-pink-400",
    link: "/quick-checkup",
  },
  {
    name: "Appointments",
    icon: <PiCalendarCheckFill size={40} />,
    bg: "from-blue-200 to-blue-400",
    link: "/appointments",
  },
  {
    name: "Health Metrics",
    icon: <PiChartLineFill size={40} />,
    bg: "from-green-200 to-green-400",
    link: "/health-metrics",
  },
  {
    name: "Emergency",
    icon: <PiSirenFill size={40} />,
    bg: "from-red-200 to-red-400",
    link: "/emergency",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-200 p-6">
      <div className="relative mb-8">
        <SparklesCore background="#dbeafe" />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-md z-10">About Us</h1>
        </div>
      </div>

      {/* Feature Cards Section */}
      <section className="mb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 justify-center items-center">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(feature.link)}
              className={`cursor-pointer bg-gradient-to-br ${feature.bg} rounded-2xl p-6 text-center shadow-xl transition-transform duration-300 ease-in-out border border-white hover:shadow-2xl hover:border-blue-500`}
            >
              <div className="text-blue-800 mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-blue-900">{feature.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 1: About the Platform */}
      <section className="mb-16 text-center max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-extrabold text-blue-700 mb-4 underline decoration-blue-400 decoration-4 underline-offset-4"
        >
          What Makes Our Platform Special?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700"
        >
          Our platform is a one-stop solution for all your healthcare needs. From quick checkups to managing emergencies and tracking health metrics, we blend smart AI with user-friendly design. <br className="hidden sm:inline" />
          Unlike other apps, we prioritize personalization, strong data security, and visually rich dashboards that turn routine healthcare into an intuitive experience. Whether you're scheduling appointments or monitoring your wellness, our elegant interface ensures everything is seamless and joyful.
        </motion.p>
      </section>

      {/* Section 2: Developers */}
      <section className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold text-blue-600 mb-8"
        >
          Meet the Developers
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 border hover:border-blue-400"
            >
              <img
                src={avatar}
                alt={dev.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-blue-300 shadow-md"
              />
              <h3 className="text-xl font-bold text-blue-700 mb-1">{dev.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{dev.desc}</p>
              <div className="flex justify-center gap-3">
                <a href={dev.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-blue-600 hover:text-blue-800" />
                </a>
                <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-pink-500 hover:text-pink-600" />
                </a>
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="text-blue-700 hover:text-blue-900" />
                </a>
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-gray-700 hover:text-black" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
