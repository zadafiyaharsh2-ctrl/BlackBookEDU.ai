import React from 'react'
import { Link } from 'react-router-dom'

const navItems = [
    { label: 'Signup', href: '/Signup' },
    { label: 'About', href: '/About' },
    { label: 'Contact', href: '/Contact' },
    { label: 'Profile' , href: '/Profile' },
]

const Navbar = () => {
  return (
    <div className='bg-white shadow-md p-4'>
      <ul className='flex justify-end space-x-4'>
        {navItems.map((item) => (
          <li key={item.label}>
            <Link 
            to={item.href}
            className='text-blue-500 hover:underline'>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navbar
