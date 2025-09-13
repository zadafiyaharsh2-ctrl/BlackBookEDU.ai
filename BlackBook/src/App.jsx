import { useState } from 'react'
import { X , Menu } from 'lucide-react';
import './App.css'

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black shadow-md z-50">
        <div className="flex justify-between items-center px-6 py-5">
          {/* Logo */}
          <h3 className="text-lg font-bold">BlackBookEDU.ai</h3>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8">
            <li>
              <a
                href="#hero"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#auth"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                Login / Signup
              </a>
            </li>
          </ul>

          {/* Mobile/Tablet Hamburger Button */}
          <button
            className="md:hidden text-black bg-white rounded-md"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <ul className="flex flex-col text-center bg-black md:hidden border-t border-zinc-800">
            {[
              { name: "Home", href: "#hero" },
              { name: "Pricing", href: "#pricing" },
              { name: "About", href: "#about" },
              { name: "Login / Signup", href: "#auth" },
            ].map((item, index) => (
              <li key={index} className="border-b border-zinc-800">
                <a
                  href={item.href}
                  className="block py-3 cursor-pointer font-medium hover:bg-zinc-900 transition active:bg-white active:text-black"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="flex flex-col md:h-screen md:flex-row items-center justify-center gap-8 px-6 md:px-20 pt-32 pb-16 bg-black"
      >
        {/* Image Container */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="mainimage.png"
            alt="BlackBook AI"
            className="rounded-xl shadow-lg bg-black max-w-full h-auto object-contain"
          />
        </div>
        {/* Text */}
        <p className="w-full md:w-1/2 text-center md:text-left text-lg leading-relaxed">
          <span className="font-bold">BlackBook AI Tutor</span> is a gamified
          learning app designed to make JEE/NEET preparation smarter and more
          engaging. Instead of solving problems from static books, the app gives
          you progressive levels of questions — starting easy and moving to
          advanced as you improve. The AI continuously tracks your performance,
          identifying strengths and weak spots.
          <br />
          Think of it as a problem-solving game where every correct answer takes
          you closer to mastering JEE/NEET.
        </p>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="flex flex-col md:h-screen md:flex-row justify-between p-5 md:pt-[100px] md:p-16 gap-8 bg-zinc-900 text-white"
      >
        {/* Free Version Card */}
        <div className="w-full md:w-1/2 rounded-xl bg-black p-6 shadow-lg hover:scale-105 transition duration-300 border border-white flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Free Version</h2>
          <ul className="space-y-3 mb-6 text-gray-300 flex-1">
            <li>✔ Access to chapter one</li>
            <li className="line-through">✘ Unlimited problem sets</li>
            <li className="line-through">✘ Advanced analytics</li>
            <li className="line-through">✘ every sunday mock test</li>
            <li className="line-through">✘ weak/strong spots analysis</li>
            <li className="line-through">✘ Ai guidence</li>
            <li className="line-through">✘ leaderboard as problem solver</li>
            <li className="line-through">✘ leaderboard as per mock test</li>
            <li className="line-through">✘ ranking in community</li>
            <li className="line-through">✘ parents Access</li>
          </ul>
          <a
            href="https://rzp.io/l/BlackBookAi"
            className="text-center bg-white py-2 rounded-lg font-semibold text-black"
          >
            Free Version
          </a>
        </div>

        {/* Paid Version Card */}
        <div className="w-full md:w-1/2 border-4 rounded-xl bg-white text-black p-6 shadow-lg hover:scale-105 transition duration-300 border-black flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Paid Version</h2>
          <ul className="space-y-3 mb-6 text-gray-700 flex-1">
            <li>✔ Access to all the chapter</li>
            <li>✔ Unlimited problem sets</li>
            <li>✔ Advanced analytics</li>
            <li>✔ every sunday mock test</li>
            <li>✔ weak/strong spots analysis</li>
            <li>✔ Ai guidence</li>
            <li>✔ leaderboard as problem solver</li>
            <li>✔ leaderboard as per mock test</li>
            <li>✔ ranking in community</li>
            <li>✔ parents Access</li>
          </ul>
          <a
            href="https://rzp.io/l/BlackBookEDU.ai"
            className="text-center bg-black py-2 rounded-lg font-semibold text-white"
          >
            Buy Premium
          </a>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="px-6 md:px-20 py-16 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-10 text-center tracking-wide">
            About BlackBookEDU.ai - How It Works
          </h2>

          {/* Mock Test */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Mock Tests</h3>
            <p className="text-gray-300">
              Every Sunday, a full-length mock test is conducted to help
              students evaluate their preparation and improve their exam
              strategy.
            </p>
          </div>

          {/* Problem Sets */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Problem Sets</h3>
            <p className="text-gray-300">
              Physics, Mathematics, Chemistry, and Biology – each chapter
              contains four types of problem sets:{" "}
              <span className="text-yellow-400">
                Basic Level, Medium Level, Hard Level, and Very Hard Level.
              </span>
            </p>
          </div>

          {/* Leaderboard 1 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Leaderboard 1</h3>
            <p className="text-gray-300">
              A leaderboard based on the number of problems solved. Each problem
              in the four sets carries different points to ensure fair ranking.
            </p>
          </div>

          {/* Leaderboard 2 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Leaderboard 2</h3>
            <p className="text-gray-300">
              A leaderboard based on mock test ratings, including individual
              rankings for each mock test.
            </p>
          </div>

          {/* AI Analytics */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">AI Analytics</h3>
            <p className="text-gray-300">
              Based on your performance, AI identifies your weak topics and
              highlights them on your personalized dashboard. and there is
              generate button to generate the path way with problems + topic
              explaination.
            </p>
          </div>

          {/* Gamified Problem Sets */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">
              Gamified Problem Sets
            </h3>
            <p className="text-gray-300">
              Problem sets are designed in a gamified way to make learning
              enjoyable, along with downloadable PDF versions for offline
              practice.
            </p>
          </div>

          {/* AI Trigger */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">
              AI Trigger - “I Don't Know”
            </h3>
            <p className="text-gray-300">
              An <span className="text-yellow-400">“I Don’t Know”</span> option
              allows students to trigger AI assistance. AI suggests which topic
              should be learned first before attempting the problem. Students
              can use this feature up to{" "}
              <span className="text-yellow-400">15 times per day</span>.
            </p>
          </div>

          {/* AI Guidance */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">AI Guidance</h3>
            <p className="text-gray-300">
              AI provides step-by-step guidance to help solve problems using
              your current knowledge. Some questions combine multiple chapters,
              and these will remain locked until you’ve mastered the required
              foundational topics.
            </p>
          </div>

          {/* Parents Access */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Parent Access</h3>
            <p className="text-gray-300">
              Parents can view detailed performance reports of their child,
              helping them track progress and improvement areas.
            </p>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} BlackBookEDU.ai. All rights reserved.
      </footer>
    </div>
  );
}

export default App
