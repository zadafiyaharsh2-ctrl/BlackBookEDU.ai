import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

// Main navigation items
const navItems = [
    { label: 'Dashboard', href: '/Dashboard' },
    { label: 'Problems', href: '/Problems' },
    { label: 'Analytics', href: '/Analytics' },
    { label: 'Ask AI', href: '/Ai' },
    { label: 'Social', href: '/Social' },
];

// We'll add these links to the mobile menu directly
const profileNavItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
    { label: 'Logout', href: '/logout' },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleMobile = () => setMobileOpen(!mobileOpen);

    return (
        <div className='bg-zinc-800 sticky top-0 shadow-md px-4 py-3 text-white z-50'>
            <div className='flex justify-between items-center'>
                <Link to='/'>
                    <h1 className='text-2xl font-bold text-white'>BlackBookEDU</h1>
                </Link>

                {/* --- Desktop Navigation --- */}
                {/* Added `items-center` for vertical alignment */}
                <ul className='hidden md:flex items-center space-x-4'>
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                    `font-semibold px-3 py-2 rounded-md hover:text-blue-500 transition-colors duration-200 ${
                                        isActive ? 'text-blue-500' : 'text-white'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                    {/* Add the ProfileDropdown as the last list item */}
                    <li>
                        <ProfileDropdown />
                    </li>
                </ul>

                {/* --- Mobile Navigation --- */}
                <div className='flex md:hidden'>
                    <button
                        onClick={toggleMobile}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        className='w-9 h-9 flex items-center justify-center rounded-full'
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </button>
                </div>
                
                {/* --- Mobile Menu Drawer --- */}
                <div
                    className={`md:hidden absolute top-[68px] left-0 right-0 mx-1 bg-zinc-800 overflow-hidden z-[90] transition-all duration-300 origin-top ${
                        mobileOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                    }`}
                >
                    <ul className='flex flex-col gap-2 p-4'>
                        {/* Render main nav items */}
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        `block w-full text-center text-lg py-3 rounded-full font-semibold ${
                                            isActive ? 'bg-zinc-700 text-blue-400' : ''
                                        }`
                                    }
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                        {/* Render profile nav items directly into the mobile menu */}
                        {profileNavItems.map((item) => (
                             <li key={item.label}>
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        `block w-full text-center text-lg py-3 rounded-full font-semibold ${
                                            isActive ? 'bg-zinc-700 text-blue-400' : ''
                                        }`
                                    }
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;