import React from 'react';

// Import your existing components
import Navbar from '../components/Common/Navbar';
import Hero from '../components/HomeComponents/Hero'; 

// Import the redesigned and new components
import Features from '../components/HomeComponents/Features';
import Testimonials from '../components/HomeComponents/Testimonials';
import Pricing from '../components/HomeComponents/Pricing';
import FAQ from '../components/HomeComponents/FAQ';
import Footer from '../components/Common/Footer';

const HomePage = () => {
  return (
    // We use bg-black as the base for the entire page
    <div className="bg-black text-white">
      <Navbar />
      
      {/* Hero section (from previous step) */}
      <Hero />
      
      {/* Redesigned "About" section, now called "Features" */}
      <Features />
      
      {/* New "Testimonials" section for social proof */}
      <Testimonials />
      
      {/* Redesigned "Pricing" section */}
      <Pricing />
      
      {/* New "FAQ" section to build trust */}
      <FAQ />
      
      {/* New "Footer" to complete the page */}
      <Footer />
    </div>
  );
};

export default HomePage;