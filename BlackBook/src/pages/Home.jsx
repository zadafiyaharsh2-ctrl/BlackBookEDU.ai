import React from "react";
import Hero from "../components/HomeComponents/Hero";
import About from "../components/HomeComponents/About";
// import Contact from "../components/HomeComponents/Contact";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";


const Home = () => {
    return ( 
        <>
        <div className="min-h-screen w-full bg-zinc-900">
        <Navbar />
        <Hero />
        <About />
        {/* <Contact /> */}
        <Footer />
        </div>
        </>
    );
}

export default Home;
