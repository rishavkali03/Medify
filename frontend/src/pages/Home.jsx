import React from "react";
import HeroSection from "../components/Herosection";
import FeatureRow from "../components/Feature";
import FAQSection from "../components/Faqsection";
import Footer from "../components/Footer";
import ChatbotIcon from "../components/ChatbotIcon";
import quickCheckupIcon from "../assets/quick-checkup.png.png";
import healthMetricsIcon from "../assets/health-metrics.png.png";
import appointmentsIcon from "../assets/appointments.png.png";
import emergencyIcon from "../assets/emergency.png.png";
import dashboardIcon from "../assets/dashboard.png.png";

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
      {/* Removed AboutSection from Home.jsx since About will be on a separate route now */}
      <FeatureRow features={features} />
      <FAQSection />
      <Footer visible={true} />
      <ChatbotIcon />
    </div>
  );
}
