"use client";

import Link from "next/link";
import { useState } from "react"; 
import { AiOutlineMenu,AiOutlineClose  } from "react-icons/ai";
import { BsFillLeafFill } from "react-icons/bs";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how" },
  { name: "Roles", href: "#roles" },
  { name: "Technology", href: "#technology" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/navLogo.png" alt="" />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-green-700 font-medium transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <button className="hidden md:block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full transition">
          Get Started
        </button>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col p-6 gap-5">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-medium"
              >
                {item.name}
              </a>
            ))}

            <button className="bg-green-700 text-white py-3 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
