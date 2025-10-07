import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react';



const navItems = [
    { label: 'Home', href: '/' },
    // { label: 'About', href: '/About' },
    { label: 'Contact', href: '/Contact' },
    { label: 'Login', href: '/Login' },
    { label: 'Profile' , href: '/Profile' },
]

const Navbar = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className='bg-zinc-800 sticky top-0 shadow-md px-4 py-3 text-white z-50'>
      {/* <div className='text-2xl font-bold text-white'>BlackBook</div> */}
      <div className='flex justify-between items-center '>
      <h1 className="text-2xl font-bold text-white">BlackBookEDU</h1>

{/* ------------Desktop------------------ */}
                      <ul className='hidden md:flex justify-end space-x-4'>
                    {navItems.map((item) => (
                        <li key={item.label}>
                            {/* Change Link to NavLink here */}
                            <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                    `font-semibold px-3 py-2 rounded-md hover:text-blue-500 transition-colors duration-200 ${
                                        isActive ? 'text-blue-500' : 'text-white'
                                    }`
                                }
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
    

{/* ===============Mobile=============== */}


 <div className='flex md:hidden justify-end gap-2 ml-auto'>
                    <button
                        onClick={toggleMobile}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        className='w-9 h-9 flex items-center justify-center rounded-full shadow transition-colors text-white'
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </button>
                </div>
                <div
                    className={`md:hidden absolute top-[68px] left-0 right-0 mx-1 bg-zinc-800 overflow-hidden z-[90] transition-all duration-300 origin-top ${
                        mobileOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
                    }`}
                    style={{ backdropFilter: 'blur(6px)' }}
                >
                    <ul className='flex flex-col gap-2 p-4'>
                        {navItems.map((item) => (
                            <li key={item.label}>
                                {/* Also change Link to NavLink here */}
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        `block w-full text-center text-lg py-3 mb-2 rounded-full font-semibold shadow-lg transition-colors duration-200 ${
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
  )
}

export default Navbar
