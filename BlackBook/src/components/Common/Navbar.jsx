import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import react-scroll Link
import { Menu, X, LogIn, User } from 'lucide-react'; // Icons for page links
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Links that SCROLL on the homepage
const scrollNavItems = [
  { label: 'Home', to: 'hero' }, // 'to' is the element ID
  { label: 'Features', to: 'features' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'Pricing', to: 'pricing' },
  { label: 'FAQ', to: 'faq' },
];

// Links that go to other PAGES
const pageNavItems = [
  { label: 'Login', href: '/Login', icon: LogIn },
  { label: 'Profile', href: '/Profile', icon: User },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  // Common styles for desktop nav links
  const commonLinkClass =
    'flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer';

  return (
    <>
      <nav className='sticky top-0 z-50 w-full bg-zinc-900/80 shadow-lg backdrop-blur-md'>
        <div className='max-w-9xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            
            {/* Logo/Brand - now a ScrollLink to top */}
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={-80} // Adjust as needed for sticky nav height
              duration={500}
              className='flex-shrink-0 cursor-pointer'
              onClick={() => setMobileOpen(false)}
            >
              <h1 className='text-2xl font-bold text-white'>BlackBookEDU</h1>
            </ScrollLink>

            {/* ------------ Desktop Navigation ------------------ */}
            <ul className='hidden md:flex items-center space-x-1'>
              {/* --- Scroll Links --- */}
              {scrollNavItems.map((item) => (
                <li key={item.label}>
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-80} // Offset for the sticky navbar height
                    duration={500}
                    className={`${commonLinkClass} text-gray-300 hover:bg-zinc-800 hover:text-white`}
                    activeClass="!text-blue-400 bg-zinc-800" // Class for active scroll link
                  >
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
              
              {/* --- Page Links --- */}
              {pageNavItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `${commonLinkClass} ${
                        isActive
                          ? 'bg-zinc-800 text-blue-400'
                          : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className='w-5 h-5' />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* =============== Mobile Toggle Button =============== */}
            <div className='flex md:hidden items-center'>
              <button
                onClick={toggleMobile}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className='p-2 rounded-md text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors'
              >
                {mobileOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
              </button>
            </div>
          </div>
        </div>

        {/* =============== Mobile Menu (Animated) =============== */}
        <AnimatePresence>
          {mobileOpen && (
            <Motion.div
              className='md:hidden absolute top-full left-0 right-0 mx-4 pb-4 bg-zinc-900/95 backdrop-blur-lg rounded-b-xl shadow-xl overflow-hidden'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <ul className='flex flex-col gap-2 p-2'>
                {/* --- Mobile Scroll Links --- */}
                {scrollNavItems.map((item) => (
                  <li key={item.label}>
                    <ScrollLink
                      to={item.to}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className='flex items-center gap-3 w-full p-3 rounded-lg font-semibold text-gray-300 hover:bg-zinc-800 hover:text-white cursor-pointer'
                      activeClass="!bg-blue-600 !text-white"
                      onClick={() => setMobileOpen(false)} // Close menu on click
                    >
                      {item.label}
                    </ScrollLink>
                  </li>
                ))}

                {/* --- Separator --- */}
                <hr className='border-zinc-700 my-2' />
                
                {/* --- Mobile Page Links --- */}
                {pageNavItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 w-full p-3 rounded-lg font-semibold transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                        }`
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className='w-5 h-5' />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;