import React, { useState, useEffect } from "react";
import Footer from "./Footer";

export default function FooterSection() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const faqEmergencySection = document.getElementById("faq-emergency");
      if (faqEmergencySection) {
        const rect = faqEmergencySection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setShowFooter(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showFooter && <Footer />;
}
