"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { FaFemale } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Highlight active path
  const isActive = (path: string) => pathname === path;

  // Let's determine navigation links based on role (Simulation for now)
  // Normally this comes from an auth context. We'll show an expanded guest/customer menu.
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/businesses" },
    { name: "Start Your Business", href: "/add-business" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-700 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <FaFemale className="text-white text-xl" />
          </div>
          <span className="text-2xl font-extrabold text-gradient tracking-tight">
            Aatmanirbhar Nari
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                isActive(item.href) ? "text-rose-700" : "text-gray-600 hover:text-rose-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-700 hover:text-rose-700 transition px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold text-white bg-gradient-to-r from-rose-700 to-orange-500 hover:from-rose-800 hover:to-orange-600 px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign up free
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 hover:text-rose-700 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-semibold ${
                    isActive(item.href) ? "text-rose-700" : "text-gray-700 hover:text-rose-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-gray-700 font-semibold py-3 rounded-xl border border-gray-200"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-white bg-gradient-to-r from-rose-700 to-orange-500 font-semibold py-3 rounded-xl shadow-md"
                >
                  Sign up free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}