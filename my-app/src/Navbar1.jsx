import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar1() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-black shadow-md z-50">
        <div className="flex justify-between items-center px-6 py-5">
          {/* Logo */}
          <h3 className="text-lg font-bold">BlackBookEDU.ai</h3>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8">
            <li>
              <a
                href="#hero"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#auth"
                className="cursor-pointer font-medium text-white hover:text-gray-400 transition"
              >
                Login / Signup
              </a>
            </li>
          </ul>

          {/* Mobile/Tablet Hamburger Button */}
          <button
            className="md:hidden text-black bg-white rounded-md"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <ul className="flex flex-col text-center bg-black md:hidden border-t border-zinc-800">
            {[
              { name: "Home", href: "#hero" },
              { name: "Pricing", href: "#pricing" },
              { name: "About", href: "#about" },
              { name: "Login / Signup", href: "#auth" },
            ].map((item, index) => (
              <li key={index} className="border-b border-zinc-800">
                <a
                  href={item.href}
                  className="block py-3 cursor-pointer font-medium hover:bg-zinc-900 transition active:bg-white active:text-black"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
