import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Mail, LogIn, User } from 'lucide-react';
import { motion as Motion , AnimatePresence } from 'framer-motion';

// Updated navItems to include icons
const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Contact', href: '/Contact', icon: Mail },
  { label: 'Login', href: '/Login', icon: LogIn },
  { label: 'Profile', href: '/Profile', icon: User },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Main navbar container with glassmorphism */}
      <nav className='sticky top-0 z-50 w-full bg-zinc-900/80 shadow-lg backdrop-blur-md'>
        <div className='max-w-9xl mx-auto px-2'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo/Brand */}
            <NavLink to='/' className='flex-shrink-0'>
              <h1 className='text-2xl font-bold text-white'>BlackBookEDU</h1>
            </NavLink>

            {/* ------------ Desktop Navigation ------------------ */}
            <ul className='hidden md:flex items-center space-x-2'>
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-zinc-800 text-blue-400'
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
              // This div hangs from the navbar, so we position it 'absolute'
              // It's full-width, but `mx-4` and `rounded-b-lg` give it a modern "card" feel
              className='md:hidden absolute top-full left-0 right-0 mx-4 pb-4 bg-zinc-900/95 backdrop-blur-lg rounded-b-xl shadow-xl overflow-hidden'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <ul className='flex flex-col gap-2 p-2'>
                {navItems.map((item) => (
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
                      onClick={() => setMobileOpen(false)} // Close menu on click
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
      {/* This empty div pushes content down so it doesn't hide behind the sticky nav */}
      {/* <div className='h-16' />  <- This is often bad practice. Better to use padding on the main layout. */}
    </>
  );
};

export default Navbar;