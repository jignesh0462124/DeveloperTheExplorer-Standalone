import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

function FAQ() {
  const { ref: faqRef, isRevealed } = useReveal({ threshold: 0.2 });
  const [openFaq, setOpenFaq] = useState(null);

  const fadeUp = useMemo(
    () =>
      `transition-all duration-700 ease-out ${
        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`,
    [isRevealed]
  );

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Developer The Explorer?",
      answer: "A 3 day, 2 night outdoor tech adventure camp where innovation meets adventure.",
    },
    {
      question: "Who can participate?",
      answer: "Any student or developer passionate about learning and exploration.",
    },
    {
      question: "Where will Developer The Explorer take place?",
      answer: "At a campsite offering a peaceful, immersive learning environment, near Nagpur.",
    },
    {
      question: "What will I gain from attending?",
      answer: `• Premium Networking - Connect with industry pros and global developers
• Industry-Level Sessions - Gain insights from real-world innovators
• Ecosystem Belonging - Join the exclusive GDGoC GHRCE community`,
    },
    {
      question: "How do I register?",
      answer: `• Fill the interest form
• Shortlisted candidates receive login credentials via email
• Secure spot by paying ticket fee within 24-48 hours
• Limited seats - Non-payment = spot offered to waitlist`,
    },
    {
      question: "Do I need prior technical experience or specific skills to attend?",
      answer: "No experience required just bring your enthusiasm and curiosity to learn.",
    },
  ];

  return (
    <section id="faq" ref={faqRef} className="w-full relative py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className={`faq-title text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16 ${fadeUp}`}>
          Developer-The-Explorer : FAQs
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item bg-white/40 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden ${fadeUp}`}
              style={{ transitionDelay: `${80 + index * 60}ms` }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-500 transition-transform ${
                    openFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

export default FAQ;

