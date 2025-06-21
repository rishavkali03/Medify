import React from "react";
import HeroSection from "../components/Herosection";
import FeatureRow from "../components/Feature";
import FAQSection from "../components/Faqsection";
import Footer from "../components/Footer";

// Feature icons
import quickCheckupIcon from "../assets/quick-checkup.png.png";
import healthMetricsIcon from "../assets/health-metrics.png.png";
import appointmentsIcon from "../assets/appointments.png.png";
import emergencyIcon from "../assets/emergency.png.png";
import dashboardIcon from "../assets/dashboard.png.png";

// Partner logos
import wbhsLogo from "../assets/wbhs.png";
import cghsLogo from "../assets/cghslogo.jpg";
import licLogo from "../assets/lichs.png";
import hdfchsLogo from "../assets/hdfchs.jpg";
import bobhsLogo from "../assets/bobhs.png";
import tcshsLogo from "../assets/tcshs.webp";

// 🔵 Styled Partner Section (like feature blocks)
const PartnersSection = () => {
  const partners = [
    { name: "WBHS", logo: wbhsLogo },
    { name: "CGHS", logo: cghsLogo },
    { name: "LIC", logo: licLogo },
    { name: "HDFCHS", logo: hdfchsLogo },
    { name: "BOBHS", logo: bobhsLogo },
    { name: "TCSHS", logo: tcshsLogo },
  ];

  return (
    <div className="px-6 md:px-20 py-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-10 text-center">
        We are attached with -
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col items-center bg-blue-50 hover:bg-blue-100 transition-all rounded-xl p-4 shadow-sm hover:shadow-md"
          >
            <div className="h-16 w-16 bg-white rounded-full shadow-md flex items-center justify-center mb-3">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 w-10 object-contain"
              />
            </div>
            <p className="text-sm font-semibold text-blue-700 text-center">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const features = [
    {
      name: "Quick Checkup",
      description: "Get a quick health assessment based on your symptoms",
      icon: quickCheckupIcon,
      link: "/quick-checkup",
    },
    {
      name: "Health Metrics",
      description: "Track and monitor your health measurements",
      icon: healthMetricsIcon,
      link: "/health-metrics",
    },
    {
      name: "Appointments",
      description: "Manage your medical appointments",
      icon: appointmentsIcon,
      link: "/appointments",
    },
    {
      name: "Emergency",
      description: "Access emergency contacts and information",
      icon: emergencyIcon,
      link: "/emergency",
    },
    {
      name: "Dashboard",
      description: "View your health overview and statistics",
      icon: dashboardIcon,
      link: "/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-150 to-blue-300 flex flex-col">
      <HeroSection />
      <FeatureRow features={features} />
      <FAQSection />
      <PartnersSection />
      <Footer visible={true} />
    </div>
  );
}
