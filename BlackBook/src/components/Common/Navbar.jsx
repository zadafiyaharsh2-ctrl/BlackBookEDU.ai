import { React, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X, LogIn, LayoutDashboard, LogOut } from 'lucide-react'; // 2. Import LogOut icon
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useCookies } from 'react-cookie'; // 3. Import useCookies

const scrollNavItems = [
  { label: 'Home', to: 'hero' },
  { label: 'Features', to: 'features' },
  { label: 'Testimonials', to: 'testimonials' },
  { label: 'Pricing', to: 'pricing' },
  { label: 'FAQ', to: 'faq' },
];


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  //  Get cookie functions and navigation
  const [cookies, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  //  Check for login status
  const isLoggedIn = !!cookies.token;

  // Create the handleLogout function 
  const handleLogout = () => {
    // Remove cookie
    removeCookie('token', { path: '/' });
    // Also clear the raw document.cookie 
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Remove from local storage
    localStorage.removeItem('token');
    
    // Close mobile menu if open
    if (mobileOpen) {
      setMobileOpen(false);
    }
    
    // Redirect the user to the login page
    navigate('/login');
  };

  // 7. Define pageNavItems dynamically based on login state
  const pageNavItems = isLoggedIn
    ? [ // ---- LOGGED IN ----
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, type: 'navlink' },
        { label: 'Logout', icon: LogOut, type: 'button', onClick: handleLogout },
      ]
    : [ // ---- LOGGED OUT ----
        { label: 'Login', href: '/Login', icon: LogIn, type: 'navlink' },
      ];

  // Common styles for desktop nav links
  const commonLinkClass =
    'flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer';

  return (
    <>
      <nav className='sticky top-0 z-50 w-full bg-zinc-900/80 shadow-lg backdrop-blur-md'>
        <div className='max-w-9xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>
            
            {/* Logo/Brand*/}
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className='flex-shrink-0 cursor-pointer'
              onClick={() => setMobileOpen(false)}
            >
              <h1 className='text-2xl font-bold text-white'>BlackBookEDU</h1>
            </ScrollLink>

            {/* ------------ Desktop Navigation ------------------ */}
            <ul className='hidden md:flex items-center space-x-1'>
              {/* --- Scroll Links  --- */}
              {scrollNavItems.map((item) => (
                <li key={item.label}>
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className={`${commonLinkClass} text-gray-300 hover:bg-zinc-800 hover:text-white`}
                    activeClass="!text-blue-400 bg-zinc-800"
                  >
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
              
              {/* --- Page Links  --- */}
              {/* 8. Updated loop to handle both links and buttons */}
              {pageNavItems.map((item) => (
                <li key={item.label}>
                  {item.type === 'navlink' ? (
                    // Render a NavLink
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
                  ) : (
                    // Render a Button for logout
                    <button
                      onClick={item.onClick}
                      className={`${commonLinkClass} text-gray-300 hover:bg-zinc-800 hover:text-white`}
                    >
                      <item.icon className='w-5 h-5' />
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* =============== Mobile Toggle Button =============== (No changes) */}
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
                {/* --- Mobile Scroll Links (No changes) --- */}
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
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </ScrollLink>
                  </li>
                ))}

                {/* --- Separator --- */}
                <hr className='border-zinc-700 my-2' />
                
                {/* --- Mobile Page Links --- */}
                {/* 9. Updated loop to handle both links and buttons */}
                {pageNavItems.map((item) => (
                  <li key={item.label}>
                    {item.type === 'navlink' ? (
                      // Render a NavLink
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
                    ) : (
                      // Render a Button for logout
                      <button
                        onClick={item.onClick}
                        className='flex items-center gap-3 w-full p-3 rounded-lg font-semibold text-gray-300 hover:bg-zinc-800 hover:text-white'
                      >
                        <item.icon className='w-5 h-5' />
                        {item.label}
                      </button>
                    )}
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