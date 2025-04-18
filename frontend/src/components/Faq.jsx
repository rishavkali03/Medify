import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    category: "General Information",
    items: [
      {
        question: "What is the purpose of this platform?",
        answer:
          "Our platform is designed to streamline healthcare services including appointment bookings, quick checkups, and emergency support."
      },
      {
        question: "Is the platform accessible 24/7?",
        answer: "Yes, our platform offers round-the-clock services including an AI-powered chatbot for instant support."
      }
    ]
  },
  {
    category: "Appointments",
    items: [
      {
        question: "How do I book an appointment?",
        answer:
          "Navigate to the 'Appointments' section, choose your preferred doctor and time slot, and confirm your booking."
      },
      {
        question: "Can I cancel or reschedule an appointment?",
        answer:
          "Yes, you can manage your appointments through your dashboard."
      }
    ]
  },
  {
    category: "Health Metrics",
    items: [
      {
        question: "What are Health Metrics?",
        answer:
          "These are personalized health measurements such as heart rate, blood pressure, etc., which you can track regularly."
      },
      {
        question: "How do I input my health data?",
        answer:
          "Go to the 'Health Metrics' section and fill in the values manually or sync from supported devices."
      }
    ]
  },
  {
    category: "Emergencies",
    items: [
      {
        question: "What should I do during a health emergency?",
        answer:
          "Use the Emergency tab to access immediate help or connect to emergency services."
      },
      {
        question: "Does the app alert nearby hospitals?",
        answer:
          "Yes, our system can notify nearby medical facilities during severe emergencies (if enabled)."
      }
    ]
  },
  {
    category: "Technical Support",
    items: [
      {
        question: "I’m facing login issues, what do I do?",
        answer: "Click on 'Forgot Password' or contact our support team for assistance."
      },
      {
        question: "Can I access the platform from mobile?",
        answer: "Yes, our platform is mobile responsive and accessible on all devices."
      }
    ]
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let indexCounter = 0;

  return (
    <section className="bg-transparent px-6 py-12 text-gray-800 font-sans">
      <h2 className="text-5xl text-center font-extrabold text-blue-500 drop-shadow-lg">
        Frequently Asked Questions
      </h2>
      <br />
      <br />
      {faqs.map((section, sectionIdx) => {
        const sectionId = section.category === "Emergencies" ? "faq-emergency" : undefined;
        return (
          <div key={sectionIdx} className="mb-10 max-w-5xl mx-auto" id={sectionId}>
            <h3 className="text-2xl font-bold mb-4 text-green-500">
              {section.category}
            </h3>
            {section.items.map((faq, faqIdx) => {
              const currentIndex = indexCounter++;
              const isOpen = openIndex === currentIndex;
              return (
                <div
                  key={faqIdx}
                  className="border border-gray-300 rounded-xl mb-3 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleIndex(currentIndex)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-lg bg-white rounded-xl"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="text-purple-500" /> : <ChevronDown className="text-gray-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-700 text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
