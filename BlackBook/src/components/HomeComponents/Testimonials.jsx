import React from 'react';

const testimonials = [
  {
    quote: "The AI analytics are insane. It found weaknesses in my physics I didn't even know I had and built a path to fix them. My scores jumped 20% in a month.",
    name: 'Rohan Sharma',
    title: 'JEE Aspirant 2026',
  },
  {
    quote: "I love the gamified problems. It feels less like studying and more like leveling up in a game. The leaderboards are a huge motivator.",
    name: 'Priya Mehta',
    title: 'NEET Aspirant 2025',
  },
  {
    quote: "As a parent, the dashboard is a lifesaver. I can see exactly where my son is struggling and how much effort he's putting in, all without having to look over his shoulder.",
    name: 'Anil Kumar',
    title: 'Parent',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="px-6 md:px-20 py-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          What Our Users Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name} 
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex flex-col"
            >
              <p className="text-lg text-gray-300 mb-6 italic flex-1">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                {/* You can replace this div with an <img> tag */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;