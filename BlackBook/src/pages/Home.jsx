import React from "react";
import Hero from "../components/HomeComponents/Hero";
import About from "../components/HomeComponents/About";
// import Contact from "../components/HomeComponents/Contact";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import Pricing from "../components/HomeComponents/Pricing";


const Home = () => {
    return ( 
        <>
        <div className="min-h-screen w-full bg-zinc-900 text-white">
        <Navbar />
        <Hero />
        <Pricing />
        <About />
        {/* <Contact /> */}
        <Footer />
        </div>
        </>
    );
}

export default Home;
