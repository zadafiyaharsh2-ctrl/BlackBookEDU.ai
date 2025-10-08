import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { label: 'Profile', path: '/profile' },
    { label: 'Playground', path: '/playground' },
    { label: 'Settings', path: '/settings' },
    { label: 'Logout', path: '/logout' }
];

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // This effect handles clicks outside the component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    // Use `ref` to track the component's wrapper element
    <div className='relative' ref={dropdownRef}>
      {/* This is the button that toggles the dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {/* You can replace this with an <img> or an icon library component */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* --- The Dropdown Menu --- */}
      {/* It only renders if `isOpen` is true */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 p-2 border rounded-lg bg-white shadow-xl z-10'>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              // Close the menu when a link is clicked
              onClick={() => setIsOpen(false)}
              // Style the active link
              className={({ isActive }) =>
                `block w-full text-left p-2 rounded-md text-gray-800 hover:bg-gray-100 ${
                  isActive ? 'bg-blue-100 font-semibold' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;