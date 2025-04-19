import {
    FaCheckCircle,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaArrowRight,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaGithub
  } from "react-icons/fa";
  
  import { useNavigate } from "react-router-dom";
  
  export default function Footer({ visible }) {
    const navigate = useNavigate();
  
    return (
      <div className={`${visible ? "block" : "hidden"} bg-transparent transition-all duration-500 animate-fade-in`}>
        <footer className="bg-white text-gray-800 text-sm py-10 px-6 md:px-16 border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Logo & Mission */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">HealthCare+</h2>
              <p className="text-gray-600 leading-relaxed">
                Empowering people through innovative digital health solutions, we believe healthcare should be smart, simple, and seamless.
              </p>
              <button
                onClick={() => navigate("/chatbot")}
                className="mt-6 inline-flex items-center gap-2 bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Discover More <FaArrowRight className="text-sm" />
              </button>
            </div>
  
            {/* Services */}
            <div>
              <h3 className="text-base font-semibold text-blue-900 mb-4 uppercase tracking-wide">Services</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" /> Virtual Consultations
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" /> 24/7 Assistance
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" /> Health Analytics
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 text-sm" /> Emergency Support
                </li>
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h3 className="text-base font-semibold text-blue-900 mb-4 uppercase tracking-wide">Contact</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-pink-500 text-sm" /> support@Medify.com
                </li>
                <li className="flex items-center gap-2">
                  <FaPhoneAlt className="text-blue-500 text-sm" /> +91 90070 09558
                </li>
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500 text-sm" /> Kolkata, India
                </li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div>
              <h3 className="text-base font-semibold text-blue-900 mb-4 uppercase tracking-wide">Newsletter</h3>
              <p className="text-gray-600 mb-4 text-sm">Get weekly insights & tips. No spam.</p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
  
          {/* Bottom Bars */}
          <div className="mt-10 border-t pt-6 flex flex-col md:flex-row md:justify-between items-center text-xs text-gray-500 gap-4 text-center">
            <span className="w-full md:w-auto">
              &copy; {new Date().getFullYear()} HealthCare Platform. All rights reserved.
            </span>
            <div className="flex gap-4 text-gray-600">
              <a href="#" className="hover:text-blue-700 transition transform hover:scale-110"><FaLinkedin size={16} /></a>
              <a href="#" className="hover:text-pink-500 transition transform hover:scale-110"><FaInstagram size={16} /></a>
              <a href="#" className="hover:text-sky-500 transition transform hover:scale-110"><FaTwitter size={16} /></a>
              <a href="#" className="hover:text-gray-800 transition transform hover:scale-110"><FaGithub size={16} /></a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  