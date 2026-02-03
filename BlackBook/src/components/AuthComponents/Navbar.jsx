import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  Puzzle,
  BarChart,
  Sparkles,
  Users,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown'; // Assuming this component exists

// Main navigation items with icons
const navItems = [
  { label: 'Dashboard', href: '/Dashboard', icon: LayoutDashboard },
  { label: 'Problems', href: '/Problems', icon: Puzzle },
  { label: 'Analytics', href: '/Analytics', icon: BarChart },
  { label: 'Ask AI', href: '/AskAI', icon: Sparkles },
  { label: 'Social', href: '/Social', icon: Users },
];

// Profile navigation items with icons (for mobile menu)
const profileNavItems = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Logout', href: '/logout', icon: LogOut },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <nav className='sticky top-0 z-50 w-full bg-black shadow-lg backdrop-blur-md'>
        <div className='max-w-9xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo/Brand */}
            <Link to='/' className='flex-shrink-0' onClick={() => setMobileOpen(false)}>
              <h1 className='text-2xl font-bold text-white'>BlackBookEDU</h1>
            </Link>

            {/* --- Desktop Navigation --- */}
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
                  >
                    <item.icon className='w-5 h-5' />
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {/* Profile Dropdown for Desktop */}
              <li>
                <ProfileDropdown />
              </li>
            </ul>

            {/* --- Mobile Toggle Button --- */}
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

        {/* --- Mobile Menu Drawer (Animated) --- */}
        <AnimatePresence>
          {mobileOpen && (
            <Motion.div
              className='md:hidden absolute top-full left-0 right-0 mx-4 bg-zinc-900/95 backdrop-blur-lg rounded-b-xl shadow-xl overflow-hidden'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <ul className='flex flex-col gap-2 p-2'>
                {/* Render main nav items */}
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
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className='w-5 h-5' />
                      {item.label}
                    </NavLink>
                  </li>
                ))}

                {/* --- Separator --- */}
                <hr className='border-zinc-700 my-2' />

                {/* Render profile nav items */}
                {profileNavItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 w-full p-3 rounded-lg font-semibold transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-500 text-white' // Slightly different active color for variety
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