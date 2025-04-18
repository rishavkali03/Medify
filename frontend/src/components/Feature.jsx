import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function FeatureRow({ features }) {
  return (
    <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="text-center mb-10 -mt-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-blue-500 drop-shadow-lg"
        >
          Find by Specialty
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-lg text-gray-800 font-medium flex justify-center items-center gap-2"
        >
          Simply browse through our extensive list of trusted doctors. Schedule your appointment hassle-free.{" "}
          <motion.span
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            😊
          </motion.span>
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-16 overflow-x-auto pb-4">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300">
                <img
                  src={feature.icon}
                  alt={feature.name}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                {feature.name}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeatureRow;
