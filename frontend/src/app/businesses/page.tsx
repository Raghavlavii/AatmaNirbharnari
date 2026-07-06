"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, Star, ChevronRight } from "lucide-react";

interface Business {
  _id: string;
  businessName: string;
  category: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  owner?: {
    fullName: string;
    email: string;
  };
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");

  const categories = ["All", "Fashion", "Food", "Beauty", "Education", "Handicrafts", "Tailoring", "Tiffin Service"];

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        // Simulate API delay for skeleton loading
        await new Promise(r => setTimeout(r, 600));
        
        // Expanded detailed mock data for interactive filtering demo
        const mockData = [
          { _id: "1", businessName: "Radhika's Handlooms", category: "Handicrafts", description: "Authentic handwoven sarees, dupattas, and ethnic wear directly from artisans.", location: "Mumbai", phone: "9876543210", email: "radhika@example.com", website: "" },
          { _id: "2", businessName: "Priya Tiffin Services", category: "Tiffin Service", description: "Healthy, home-cooked daily meals with customized menus.", location: "Delhi", phone: "9876543211", email: "priya@example.com", website: "" },
          { _id: "3", businessName: "Glow Beauty Parlour", category: "Beauty", description: "Premium beauty, hair care and bridal makeup services at home.", location: "Bangalore", phone: "9876543212", email: "glow@example.com", website: "" },
          { _id: "4", businessName: "Creative Clay Creations", category: "Handicrafts", description: "Handmade terracotta pots, vases, and home decor items.", location: "Pune", phone: "9876543213", email: "creative@example.com", website: "" },
          { _id: "5", businessName: "Ananya's Boutique", category: "Fashion", description: "Custom stitching, designs, blouses, and tailoring services.", location: "Mumbai", phone: "9876543214", email: "ananya@example.com", website: "" },
          { _id: "6", businessName: "Smart Minds Tutoring", category: "Education", description: "Online & offline primary and high school education classes.", location: "Kolkata", phone: "9876543215", email: "smartminds@example.com", website: "" },
          { _id: "7", businessName: "Spices & Sweets Catering", category: "Food", description: "Traditional sweet making and event food catering services.", location: "Chennai", phone: "9876543216", email: "spices@example.com", website: "" },
          { _id: "8", businessName: "Stitch Craft Studio", category: "Tailoring", description: "Professional ladies tailoring, designer suits, and alterations.", location: "Delhi", phone: "9876543217", email: "stitch@example.com", website: "" }
        ];
        
        try {
          const response = await fetch(`http://localhost:5000/api/business?search=${search}&category=${category}&location=${location}`);
          const data = await response.json();
          if (data.success && data.businesses.length > 0) {
            setBusinesses(data.businesses);
          } else {
            // Apply frontend filtering on fallback data
            const filtered = mockData.filter(biz => {
              const matchesSearch = search ? (
                biz.businessName.toLowerCase().includes(search.toLowerCase()) || 
                biz.description.toLowerCase().includes(search.toLowerCase())
              ) : true;
              
              const matchesLocation = location ? (
                biz.location.toLowerCase().includes(location.toLowerCase())
              ) : true;
              
              const matchesCategory = category === "All" ? true : (
                biz.category.toLowerCase() === category.toLowerCase()
              );
              
              return matchesSearch && matchesLocation && matchesCategory;
            });
            setBusinesses(filtered);
          }
        } catch {
          // Frontend filtering on fallback data
          const filtered = mockData.filter(biz => {
            const matchesSearch = search ? (
              biz.businessName.toLowerCase().includes(search.toLowerCase()) || 
              biz.description.toLowerCase().includes(search.toLowerCase())
            ) : true;
            
            const matchesLocation = location ? (
              biz.location.toLowerCase().includes(location.toLowerCase())
            ) : true;
            
            const matchesCategory = category === "All" ? true : (
              biz.category.toLowerCase() === category.toLowerCase()
            );
            
            return matchesSearch && matchesLocation && matchesCategory;
          });
          setBusinesses(filtered);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [search, category, location]);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore Businesses</h1>
            <p className="text-gray-500 mt-2 text-lg">Support local women entrepreneurs in your city.</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by business name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="w-full lg:w-64 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="w-full lg:w-64 relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none cursor-pointer text-gray-900"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Categories Quick Select Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200" 
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Business Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 h-80 animate-pulse border border-gray-100">
                <div className="w-full h-32 bg-gray-100 rounded-2xl mb-4"></div>
                <div className="w-3/4 h-6 bg-gray-100 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-100 rounded mb-6"></div>
                <div className="w-full h-10 bg-gray-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900">No businesses found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businesses.map((business, i) => {
              // Determine gradient and icon based on category for rich visual cards
              let cardBg = "from-purple-500 to-pink-500";
              let cardEmoji = "🌸";

              if (business.category.toLowerCase().includes("food") || business.category.toLowerCase().includes("tiffin")) {
                cardBg = "from-amber-400 to-orange-500";
                cardEmoji = "🍲";
              } else if (business.category.toLowerCase().includes("fashion") || business.category.toLowerCase().includes("tailor")) {
                cardBg = "from-blue-400 to-indigo-600";
                cardEmoji = "👗";
              } else if (business.category.toLowerCase().includes("beauty")) {
                cardBg = "from-pink-400 to-rose-500";
                cardEmoji = "✨";
              } else if (business.category.toLowerCase().includes("handicraft")) {
                cardBg = "from-purple-500 to-indigo-500";
                cardEmoji = "🏺";
              } else if (business.category.toLowerCase().includes("education")) {
                cardBg = "from-teal-400 to-emerald-600";
                cardEmoji = "📚";
              }

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={business._id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Card Header Banner */}
                  <div className={`h-36 bg-gradient-to-br ${cardBg} relative flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">{cardEmoji}</span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {business.category}
                      </span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold text-gray-700 ml-1">4.9</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {business.businessName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                      {business.description}
                    </p>

                    <div className="flex items-center text-gray-500 text-sm mb-6">
                      <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                      {business.location}
                    </div>

                    <Link
                      href={`/businesses/${business._id}`}
                      className="w-full py-3 px-4 bg-gray-50 hover:bg-purple-600 text-gray-700 hover:text-white rounded-xl font-semibold flex items-center justify-center transition-colors group/btn"
                    >
                      View Profile
                      <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}