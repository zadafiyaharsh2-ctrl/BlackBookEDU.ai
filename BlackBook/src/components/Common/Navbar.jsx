import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react';



const navItems = [
    { label: 'Home', href: '/' },
    // { label: 'About', href: '/About' },
    { label: 'Contact', href: '/Contact' },
    { label: 'Signup', href: '/Signup' },
    { label: 'Profile' , href: '/Profile' },
]

const Navbar = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <div className='bg-zinc-800 shadow-md px-4 py-3 '>
      {/* <div className='text-2xl font-bold text-white'>BlackBook</div> */}
      <div className='flex justify-between items-center '>
      <h1 className="text-2xl font-bold text-white">BlackBook</h1>

{/* ------------Desktop------------------ */}
      <ul className='hidden md:flex justify-end space-x-4 '>
        {navItems.map((item) => (
          <li key={item.label}>
            <Link 
            to={item.href}
            className='text-white hover:text-blue-500 font-semibold px-3 py-2 rounded-md hover:scale-105 transition-transform duration-200'
            onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      

{/* ===============Mobile=============== */}


<div className="flex md:hidden justify-end gap-2 ml-auto">
         
          <button
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="w-9 h-9 flex items-center justify-center rounded-full shadow  transition-colors"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>


<div
        className={`md:hidden absolute top-[68px] left-0 right-0 mx-1 bg-white overflow-hidden z-[90] transition-all duration-300 origin-top ${
          mobileOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
        style={{ backdropFilter: 'blur(6px)' }}
      >
      
        <ul className="flex flex-col  gap-2 p-4">
          {navItems.map(item => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="block w-full text-center text-lg py-3 mb-2 rounded-full  font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default Navbar
