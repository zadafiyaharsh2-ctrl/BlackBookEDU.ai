import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Removed ScrollTrigger import
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // You were importing this but not using it
import Login from '../../pages/Login';
// Removed: gs..registerPlugin(ScrollTrigger);

const Hero = () => {
  // --- Refs ---
  const heroRef = useRef(null);
  // Removed: const videoRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  // --- GSAP Animations ---
  useLayoutEffect(() => {
    // We only need the intro stagger animation now
    const ctx = gsap.context(() => {
      // 1. Staggered Intro Animation for Text
      gsap.from([titleRef.current, textRef.current, ctaRef.current], {
        opacity: 0,
        y: 30, // Start 30px down
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2, // 0.2s delay between each item
      });

      // --- All ScrollTrigger code has been removed ---
      
    }, heroRef); // Scope the context to the heroRef

    // Cleanup function
    return () => {
      ctx.revert(); // Revert all animations created in this context
    };
  }, []); // Empty dependency array, runs once on mount

  return (
    <section
      ref={heroRef}
      id='hero'
      className="hero grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 md:px-20 py-20 min-h-screen bg-zinc-950 text-white"
    >
      
      {/* --- Video Container --- */}
      <div className="w-full h-full flex items-center justify-center">
        <video
          // Removed: ref={videoRef}
          src="demo-video.mp4"
          alt="BlackBook AI Demo Video"
          className="rounded-xl shadow-2xl shadow-blue-900/20 max-w-full h-auto object-contain"
          muted       // Muted is required for autoplay
          playsInline  // Required for iOS
          preload="auto"
          autoPlay     // Added: makes the video play automatically
          loop         // Added: makes the video loop
        />
      </div>
      
      {/* --- Text Content --- */}
      <div className="flex flex-col gap-6 text-center md:text-left">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
        >
          BlackBook AI Tutor
        </h1>
        <p ref={textRef} className="text-lg md:text-xl text-gray-300 leading-relaxed">
          A gamified learning app designed to make JEE/NEET preparation smarter
          and more engaging. The AI tracks your performance, identifying
          strengths and weak spots to create a progressive path, just like a
          video game.
        </p>
        
        {/* Call to Action (CTA) Button */}
        <div ref={ctaRef} className="flex justify-center md:justify-start">
          {/* Wrapped button in a Link component to make it functional */}
          <Link to="/Login">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

    </section>
  );
};

export default Hero;