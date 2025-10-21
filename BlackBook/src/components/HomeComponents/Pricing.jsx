import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const freeFeatures = [
  { text: 'Access to chapter one', included: true },
  { text: 'Limited problem sets', included: true },
  { text: 'Limited AI guidance', included: true },
  { text: 'Advanced analytics', included: false },
  { text: 'Every Sunday mock test', included: false },
  { text: 'Weak/strong spots analysis', included: false },
  { text: 'Leaderboard access', included: false },
  { text: 'Parent Access', included: false },
];

const paidFeatures = [
  { text: 'Access to all chapters', included: true },
  { text: 'Unlimited problem sets', included: true },
  { text: 'Advanced AI guidance', included: true },
  { text: 'Advanced analytics', included: true },
  { text: 'Every Sunday mock test', included: true },
  { text: 'Weak/strong spots analysis', included: true },
  { text: 'Leaderboard access', included: true },
  { text: 'Parent Access', included: true },
];

const Pricing = () => {
  return (
    <section id="pricing" className="px-6 md:px-20 py-24 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Choose Your Plan
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {/* --- Free Version Card --- */}
          <div className="w-full md:w-1/2 rounded-xl bg-zinc-900/50 p-8 border border-zinc-800 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Free Version</h3>
            <p className="text-gray-400 mb-6">Get a taste of the platform.</p>
            <p className="text-4xl font-bold mb-6">
              $0<span className="text-lg font-normal text-gray-400">/month</span>
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                  <span className={!feature.included ? 'line-through text-gray-500' : 'text-gray-300'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/Login" // Links to your login/signup page
              className="text-center w-full bg-zinc-800 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* --- Paid Version Card (Highlighted) --- */}
          {/* This wrapper div creates the glowing border effect */}
          <div className="w-full md:w-1/2 rounded-xl p-1 bg-gradient-to-r from-blue-400 to-purple-500 relative">
            <span className="absolute -top-3 left-6 bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </span>
            <div className="bg-black rounded-lg p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-gray-400 mb-6">Unlock your full potential.</p>
              <p className="text-4xl font-bold mb-6">
                $9<span className="text-lg font-normal text-gray-400">/month</span>
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {paidFeatures.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://rzp.io/l/BlackBookEDU.ai"
                className="text-center w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
              >
                Buy Premium
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;