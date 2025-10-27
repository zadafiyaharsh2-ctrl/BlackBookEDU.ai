import React from 'react';

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
    <div className="bg-black text-white">
      <Navbar />
      
      <Hero />
      
      <Features />
      
      <Testimonials />
      
      <Pricing />
      
      <FAQ />
      
      <Footer />
    </div>
  );
};

export default HomePage;