import React from "react";
import FAQ from "../components/FAQ"; // Assuming FAQ component is imported

export default function FAQSection() {
  return (
    <div className="mt-20 min-h-[120vh] px-6 pb-32 bg-transparent">
      <FAQ />
      <div id="faq-emergency" className="pt-20" />
    </div>
  );
}
