"use client";

import Link from "next/link";
import { FaFemale } from "react-icons/fa";

export default function Navbar() {
  const navLink =
    "text-gray-800 hover:text-pink-600 font-semibold transition-all duration-300";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
        >
          <FaFemale className="text-pink-600 text-3xl hover:rotate-12 transition-transform duration-300" />

          <span className="text-3xl font-extrabold text-purple-700">
            Aatmanirbhar Nari
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className={navLink}>
            Home
          </Link>

          <Link href="/businesses" className={navLink}>
            Businesses
          </Link>

          <Link href="/add-business" className={navLink}>
            Add Business
          </Link>

          <Link href="/dashboard" className={navLink}>
            Dashboard
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-all duration-300"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}