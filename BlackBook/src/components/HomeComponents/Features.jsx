import React from 'react';
import {
  Target,
  BookOpen,
  Trophy,
  BarChart,
  Brain,
  Gamepad2,
  HelpCircle,
  Users,
  Lock,
} from 'lucide-react';

// Feature data array
const features = [
  {
    icon: Target,
    title: 'Mock Tests',
    description: 'Full-length mock tests every Sunday to evaluate your preparation and exam strategy.',
  },
  {
    icon: BookOpen,
    title: 'Progressive Problem Sets',
    description: 'Four levels of problem sets for each chapter, from Basic to Very Hard, to build your mastery.',
  },
  {
    icon: Trophy,
    title: 'Dual Leaderboards',
    description: 'Rank up on two leaderboards: one for problems solved and one for mock test ratings.',
  },
  {
    icon: Brain,
    title: 'AI Analytics',
    description: 'Our AI identifies your weak topics and generates a personalized pathway with problems and explanations.',
  },
  {
    icon: Gamepad2,
    title: 'Gamified Learning',
    description: 'Enjoyable, game-like problem sets with downloadable PDFs for offline practice.',
  },
  {
    icon: HelpCircle,
    title: 'AI "I Don\'t Know" Trigger',
    description: 'Get AI assistance up to 15 times a day. The AI suggests prerequisite topics to learn first.',
  },
  {
    icon: Lock,
    title: 'Guided Problem Solving',
    description: 'AI provides step-by-step guidance. Advanced questions stay locked until you master the prerequisites.',
  },
  {
    icon: Users,
    title: 'Parent Access',
    description: 'Parents can view detailed performance reports to track your progress and improvement areas.',
  },
];

const Features = () => {
  return (
    // Use bg-zinc-950 to match the Hero section
    <section id="features" className="px-6 md:px-20 py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
          How It Works
        </h2>
        <p className="text-lg md:text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          BlackBookEDU isn't just a question bank. It's an AI-powered ecosystem
          designed to gamify your learning and pinpoint your weaknesses.
        </p>

        {/* --- Feature Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              // This is the "glassmorphism" card style
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 transition-all duration-300 hover:border-blue-500/50 hover:bg-zinc-900"
            >
              <div className="mb-4">
                <feature.icon className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;