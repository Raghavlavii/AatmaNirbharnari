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
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-rose-50 via-orange-50/30 to-white -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

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