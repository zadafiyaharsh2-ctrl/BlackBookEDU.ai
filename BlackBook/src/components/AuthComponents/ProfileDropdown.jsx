import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const navItems = [
    { label: 'Profile', path: '/profile' },
    { label: 'Playground', path: '/playground' },
    { label: 'Settings', path: '/settings' },
    { label: 'Logout' }
];

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [ , , removeCookie] = useCookies(["token"]);


    // This effect handles clicks outside the component to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

   const handleLogout = () => {
    // Set the cookie's expiration date to the past to delete it
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    removeCookie("token", { path: '/' });

    localStorage.removeItem("token");
    // Redirect the user
    navigate('/home');
}
    
    // You can define base styles here to keep the return statement cleaner
    const baseLinkClass = 'block w-full text-left p-2 rounded-md text-gray-800 hover:bg-gray-100';

    return (
        <div className='relative' ref={dropdownRef}>
            {/* This is the button that toggles the dropdown */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </button>

            {/* --- The Dropdown Menu --- */}
            {isOpen && (
                <div className='absolute right-0 mt-2 w-48 p-2 border rounded-lg bg-white shadow-xl z-10'>
                    {navItems.map((item) => (
                        item.label === 'Logout' ? ( // <-- THE FIX IS HERE
                            <button
                                key={item.label}
                                onClick={handleLogout}
                                className={`${baseLinkClass} text-red-600 hover:bg-red-100`}
                            >
                                {item.label}
                            </button>
                        ) : (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `${baseLinkClass} ${isActive ? 'bg-blue-100 font-semibold' : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;