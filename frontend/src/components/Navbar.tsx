"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Bell, MessageSquare, User } from "lucide-react";
import { FaFemale } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  
  // Example state for logged in vs out - assuming logged in if on dashboard
  const isLoggedIn = pathname.includes('/dashboard') || pathname.includes('/settings');

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/businesses" },
    { name: "Start Your Business", href: "/add-business" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 m-4 mb-0 rounded-2xl shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Brand / Logo (Hidden on Desktop if Sidebar has it, but let's keep it responsive) */}
        <Link href="/" className={clsx("flex items-center gap-3 group", isLoggedIn ? "lg:hidden" : "")}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-pink to-brand-coral flex items-center justify-center shadow-md">
            <FaFemale className="text-white text-lg" />
          </div>
          <span className="text-xl font-extrabold text-gradient tracking-tight">
            Aatmanirbhar Nari
          </span>
        </Link>
        
        {/* Empty div for spacing on Desktop so Search is centered or right-aligned */}
        <div className="hidden lg:block w-64"></div>

        {/* Global Search Bar (Only for Logged In/Dashboard view) */}
        {isLoggedIn ? (
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-brand-pink transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border-transparent bg-white/50 backdrop-blur-sm rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink/20 focus:bg-white focus:border-brand-pink transition-all duration-300"
              placeholder="Search products, orders, or customers..."
            />
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5",
                  isActive(item.href) ? "text-brand-pink" : "text-gray-600 hover:text-brand-coral"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        {/* Right Section (Icons & Profile OR Auth Buttons) */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors relative">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-coral rounded-full"></span>
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-pink rounded-full animate-pulse"></span>
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2"></div>
              <div className="relative">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-4 bg-white/50 hover:bg-white/80 border border-gray-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-pink/20"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-peach to-brand-coral flex items-center justify-center text-white">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Profile</span>
                </button>
                
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 rounded-2xl glass-panel bg-white/80 border-gray-100 shadow-xl overflow-hidden flex flex-col p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-gray-100/50 mb-1">
                        <p className="text-sm font-bold text-gray-900">My Account</p>
                      </div>
                      
                      <Link href="/" className="px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-brand-pink hover:bg-white/60 rounded-xl transition-colors">
                        Home Page
                      </Link>
                      <Link href="/settings" className="px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-brand-pink hover:bg-white/60 rounded-xl transition-colors">
                        Settings
                      </Link>
                      
                      <div className="h-px bg-gray-100/50 my-1"></div>
                      
                      <button 
                        onClick={() => {
                          localStorage.removeItem("user");
                          window.location.href = "/login";
                        }}
                        className="px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl text-left transition-colors"
                      >
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-700 hover:text-brand-pink transition px-4 py-2"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold text-white bg-gradient-to-r from-brand-pink to-brand-coral hover:shadow-lg hover:shadow-brand-pink/20 px-5 py-2.5 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign up free
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-brand-pink transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden rounded-b-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    "block text-lg font-semibold",
                    isActive(item.href) ? "text-brand-pink" : "text-gray-700 hover:text-brand-coral"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}