import { React ,useState }  from 'react'
import { Menu , X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
    { label: 'AI' , href: '/AI' },
    { label: 'Analytics' , href: '/Analytics' },
    { label: 'Problems', href: '/Problems' },
    { label: 'Profile', href: '/Profile' },
]

const Navbar = () => {

    const [ mobileOpen, setMobileOpen] = useState(false);
    const toggleMobile = () => setMobileOpen(!mobileOpen);


  return (

    <div className='bg-zinc-800 sticky top-0 shadow-md px-4 py-3 text-white z-50'>
      <div className='flex justify-between items-center '>
        <Link to="/">
          <h1 className='text-2xl font-bold text-white'>BlackBookEDU</h1>
        </Link>

     {/* Desktop Navigation */}
     <ul className='hidden md:flex justify-end space-x-4'>
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

    </div>
    </div>

  )
}

export default Navbar