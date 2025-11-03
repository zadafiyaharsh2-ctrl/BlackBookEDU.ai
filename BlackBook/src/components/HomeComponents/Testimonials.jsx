import React, { useRef } from 'react';

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
 {
    quote: "Fantastic course structure and brilliant test series. The predictive ranking is surprisingly accurate.",
    name: 'Suresh Menon',
    title: 'UPSC Candidate',
  },
  {
    quote: "Switched from a competitor and the difference in personalized practice is night and day. This saves me hours.",
    name: 'Kavita Singh',
    title: 'CAT 2026',
  },
  {
    quote: "My study routine was unstructured chaos. The platform provided the discipline I lacked.",
    name: 'David Lee',
    title: 'SAT Student',
  },
];

const Testimonials = () => {
  const scrollContainerRef = useRef(null);
  const scrollDistance = 352;

  const scroll= (direction) => {
    if(scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behaviour: 'smooth',
      });
    }
  };



  return (
    <section id='testimonials' className='px-6 md:px-20 py-24 bg-black'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl md:text-5xl font-bold text-center mb-16 text-white'>
          What Our Users Say
        </h2>

        <div className='relative'>

          <button
            onClick={() => scroll('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-zinc-800 border border-zinc-700 rounded-full text-white shadow-xl hover:bg-zinc-700 transition duration-200 focus:ring-2 focus:ring-blue-500'
            aria-label="Scroll testimonials left"
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7'>
              </path>


            </svg>

          </button>

         <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-zinc-800 border border-zinc-700 rounded-full text-white shadow-xl hover:bg-zinc-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll testimonials right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
          ref={scrollContainerRef}
          className="flex flex-row flex-nowrap overflow-x-scroll scroll-smooth no-scrollbar py-2 px-12"
          > 
           {testimonials.map((testimonial, index) =>(
            <div 
              key={index} 
              className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex flex-col flex-shrink-0 w-80 mr-8 last:mr-0"
              >
                <p
                  className='text-lg text-gray-300 mb-6 italic flex-1'
                >
                  "{testimonial.quote}"

                </p>
                <div className='flex items-center h-30'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0 mr-4'>
                    <div >
                      <h4 className='font-semibold text-white  w-30'>{testimonial.name}</h4>
                      <p className='text-sm text-gray-200 w-24'>{testimonial.title}</p>

                    </div>
                  </div>
                  </div>

              </div>
           ) )}

          </div>

        </div>

      </div>


    </section>
  );
};

export default Testimonials;