import React from 'react'

const Hero = () => {
  return (
     <section
        
        className="hero flex flex-col md:h-screen md:flex-row items-center justify-center gap-8 px-6 md:px-20 pt-32 pb-16 bg-black"
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

  )
}

export default Hero