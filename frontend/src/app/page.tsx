"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingBag, Scissors, Sparkles, Coffee } from "lucide-react";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const categories = [
    { name: "Tiffin Service", icon: Coffee, color: "bg-orange-100 text-orange-600" },
    { name: "Tailoring", icon: Scissors, color: "bg-blue-100 text-blue-600" },
    { name: "Beauty", icon: Sparkles, color: "bg-orange-100 text-orange-600" },
    { name: "Handicrafts", icon: ShoppingBag, color: "bg-rose-100 text-rose-600" },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-transparent">
      {/* Background Decor - Removed opaque layers so global Layout Doodles show through, and added Home Page specific Doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Big Sparkle */}
        <svg className="absolute top-[10%] left-[5%] w-16 h-16 text-brand-pink/50 animate-float" style={{ animationDelay: "0.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        {/* Floating Heart */}
        <svg className="absolute top-[20%] right-[10%] w-14 h-14 text-brand-coral/60 animate-float" style={{ animationDelay: "1.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        {/* Star */}
        <svg className="absolute top-[50%] left-[8%] w-10 h-10 text-brand-peach/80 animate-float" style={{ animationDelay: "2.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        {/* Little Sparkle */}
        <svg className="absolute top-[60%] right-[5%] w-12 h-12 text-brand-pink/60 animate-float" style={{ animationDelay: "3.5s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        {/* Another Heart */}
        <svg className="absolute bottom-[10%] left-[20%] w-12 h-12 text-brand-coral/50 animate-float" style={{ animationDelay: "0.2s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100">
            <span className="flex h-2 w-2 rounded-full bg-rose-600"></span>
            <span className="text-sm font-semibold text-rose-700 uppercase tracking-wider">Empowering Women Entrepreneurs</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            Turn your passion into a <br className="hidden md:block" />
            <span className="text-gradient">thriving business.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Aatmanirbhar Nari is the ultimate platform for women to showcase their home-based businesses, connect with customers, and grow independently.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-700 to-orange-500 hover:from-rose-800 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Selling Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/businesses"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 hover:border-rose-300 hover:bg-rose-50 px-8 py-4 rounded-2xl font-semibold transition-all shadow-sm"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
          <p className="text-gray-500 mt-4">Discover talented women across various skill sets</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${cat.color}`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-2">Explore services</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}