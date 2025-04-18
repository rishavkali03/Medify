import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, Smartphone } from "lucide-react";

const aiIcon = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";

export default function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2"
    >
      {/* Popup Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-2 flex flex-col items-end space-y-2"
          >
            <Link to="/chatbot">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-gray-800 hover:bg-blue-100"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with us
              </motion.div>
            </Link>

            <a
              href="https://wa.me/919007009556"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-md text-sm font-medium hover:bg-green-600"
              >
                <Smartphone className="w-4 h-4" />
                Chat on <span className="text-xl ml-1">🟢</span>
              </motion.div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Floating Button */}
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 18px rgba(59, 130, 246, 0.5)", // soft blue glow
        }}
        className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-blue-500 transition-all duration-300 ease-in-out"
      >
        <motion.img
          src={aiIcon}
          alt="AI Icon"
          className="w-12 h-12"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      </motion.button>
    </div>
  );
}
