import { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Textarea from "../components/ui/textarea";

export default function Contact() {
  const footerRef = useRef(null);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col justify-between">
      <div className="flex flex-col items-center mt-10 px-4 text-center">
        <motion.h1
          className="text-5xl font-extrabold text-blue-500 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Have questions or need help? We're here for you. Use the form below or sign in to access more support options.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Input type="text" placeholder="Your Name" className="p-4" required />
          <Input type="email" placeholder="Your Email" className="p-4" required />
          <Textarea placeholder="Your Message" className="p-4 h-32" required />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300">
              Send Message
            </Button>
          </motion.div>

          {messageSent && (
            <motion.p
              className="text-green-600 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Message sent successfully!
            </motion.p>
          )}

          <div className="text-sm text-gray-600 mt-4">
            Already have an account?
            <a href="/signin" className="text-blue-600 hover:underline ml-1">
              Sign in to know more
            </a>
          </div>
        </motion.form>
      </div>

      <motion.footer
        ref={footerRef}
        className="bg-blue-900 text-white p-6 mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p>&copy; {new Date().getFullYear()}  Arogyaमार्ग. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-blue-300 transition" aria-label="Privacy Policy">Privacy Policy</a>
          <a href="#" className="hover:text-blue-300 transition" aria-label="Terms of Service">Terms of Service</a>
          <a href="#" className="hover:text-blue-300 transition" aria-label="Support">Support</a>
        </div>

        <div className="flex justify-center space-x-6 mt-6 text-xl">
          <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-400 transition" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="#" className="hover:text-blue-400 transition" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </motion.footer>
    </div>
  );
}
