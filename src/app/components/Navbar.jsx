"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-9999 bg-white backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/navLogo.png" alt="" />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className=" text-gray-700 hover:text-green-700 font-medium transition"
            >
              {item.name}
            </Link>
          ))}
          <Link
            className="text-gray-700 hover:text-green-700 font-medium transition"
            href={"/Dashboard"}
          >
            Dashboard
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/Register"
            className="rounded-md bg-[#2E5A3B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1F3D2B]"
          >
            Register
          </Link>

          <Link
            href="/Login"
            className="rounded-md border border-[#2E5A3B] px-4 py-2 text-sm font-medium text-[#2E5A3B] transition hover:bg-[#2E5A3B] hover:text-white"
          >
            Login
          </Link>
        </div>

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

            <div className="flex items-center gap-2">
              <Link
                href="/Register"
                className="rounded-md bg-[#2E5A3B] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1F3D2B]"
              >
                Register
              </Link>

              <Link
                href="/Login"
                className="rounded-md border border-[#2E5A3B] px-4 py-2 text-sm font-medium text-[#2E5A3B] transition hover:bg-[#2E5A3B] hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
