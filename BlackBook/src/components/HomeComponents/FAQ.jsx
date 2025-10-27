import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-6 text-left"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-gray-400">{answer}</p>
        </div>
      </div>
    </div>
  );
};

// FAQ  Mock Data 
const faqs = [
  {
    question: 'How does the AI know my weak topics?',
    answer: 'Our AI analyzes your performance on every problem and mock test. It tracks patterns in incorrect answers, time taken, and topics you avoid, creating a detailed profile of your strengths and weaknesses.',
  },
  {
    question: 'Is this only for JEE and NEET?',
    answer: 'Currently, our question bank and AI models are highly optimized for the JEE (Main + Advanced) and NEET exam patterns. We plan to expand to other competitive exams in the future.',
  },
  {
    question: 'Can I use the "I Don\'t Know" feature unlimited times?',
    answer: 'The feature is limited to 15 uses per day. This is by design, to encourage you to attempt problems first and use the AI guidance as a learning tool, not a crutch.',
  },
  {
    question: 'What if I master a topic? Will the problems get harder?',
    answer: 'Yes. Our system is progressive. As you correctly solve problems in one level (e.g., Medium), the platform will automatically start giving you more problems from the next level (Hard).',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="px-6 md:px-20 py-24 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="w-full">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;