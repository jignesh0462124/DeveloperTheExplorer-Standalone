import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is “Developer: The Explorer”?",
      answer:
        "This is a 3-day 2-night outdoor tech track organized by GDG GHRCE — adventure and innovation combined. Participants will explore nature, attend mentor sessions, take part in quizzes, and collaborate on creative developer challenges, all while camping.",
    },
    {
      question: "Who can participate?",
      answer:
        "Any student or developer passionate about learning, coding, and networking is welcome! You don’t need to be an expert — just bring curiosity, enthusiasm, and a willingness to explore.",
    },
    {
      question: "Where will the event take place?",
      answer: "The event will be hosted at a forest campsite or eco-retreat zone.",
    },
    {
      question: "What are the event dates?",
      answer:
        "It’s a 3-day, 2-night event. Final dates will be announced soon",
    },
    {
      question: "What kind of activities are planned?",
      answer: `Expect a mix of:
▪︎ Tech quizzes and coding challenges
▪︎ Mentor-led sessions and fireside talks
▪︎ Team-building and creative workshops
▪︎ Camping, fun games, and nature exploration`,
    },
    {
      question: "Is accommodation and food included?",
      answer:
        "Yes. Camping tents and all meals (breakfast, lunch, dinner, and snacks) are included in the participation fee. We’ll also ensure basic hygiene and medical facilities are available.",
    },
    {
      question: "What should participants bring?",
      answer:
        "Bring essentials like your laptop and charger (for tech sessions), comfortable clothes and shoes, personal hygiene items, and a positive, adventurous mindset. Other items will be mentioned in the registration form.",
    },
    {
      question: "Is it safe?",
      answer:
        "Yes. The campsite will have security staff, medical assistance, and mentors present throughout. Participants will be supervised and guided during all activities.",
    },
    {
      question: "How can I register?",
      answer:
        "Registrations will open soon on the official GDG GHRCE website or via the provided registration link. Spots are limited, so keep an eye out!",
    },
    {
      question: "Can non-coders join?",
      answer:
        "Absolutely. This event is about exploring tech, teamwork, and creativity — not just coding. Designers, tech enthusiasts, and innovators are all welcome.",
    },
    {
      question: "Is there any participation fee?",
      answer:
        "Yes, a nominal fee will be charged to cover logistics, food, and accommodation. Details will be shared in the registration form.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
          Developer: The Explorer — FAQs
        </h2>

        <div className="space-y-4">
          {faqs.slice(0, visibleCount).map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
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

        {visibleCount < faqs.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FAQ;
