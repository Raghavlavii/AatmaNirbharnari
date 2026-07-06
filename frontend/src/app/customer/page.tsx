"use client";

import { motion } from "framer-motion";
import { Heart, Users, ShoppingBag, TrendingUp, MapPin, Star, ArrowUpRight, Eye } from "lucide-react";

export default function CustomerInsightsPage() {
  const topCustomers = [
    { name: "Priya Sharma", orders: 12, spent: "₹5,400", location: "Mumbai", rating: 5 },
    { name: "Anjali Gupta", orders: 9, spent: "₹4,200", location: "Delhi", rating: 5 },
    { name: "Sneha Reddy", orders: 7, spent: "₹3,850", location: "Bangalore", rating: 4 },
    { name: "Neha Singh", orders: 6, spent: "₹2,100", location: "Pune", rating: 5 },
    { name: "Kavita Patel", orders: 5, spent: "₹1,750", location: "Ahmedabad", rating: 4 },
  ];

  const popularProducts = [
    { name: "Handcrafted Jhumkas", views: 342, orders: 45, revenue: "₹20,250" },
    { name: "Organic Cotton Saree", views: 289, orders: 32, revenue: "₹67,200" },
    { name: "Terracotta Pot Set", views: 198, orders: 28, revenue: "₹23,800" },
    { name: "Ayurvedic Skin Kit", views: 156, orders: 21, revenue: "₹25,200" },
  ];

  const locationData = [
    { city: "Mumbai", customers: 156, percentage: 32 },
    { city: "Delhi", customers: 98, percentage: 20 },
    { city: "Bangalore", customers: 87, percentage: 18 },
    { city: "Pune", customers: 72, percentage: 15 },
    { city: "Others", customers: 73, percentage: 15 },
  ];

  const stats = [
    { label: "Total Customers", value: "486", change: "+12.5%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Repeat Customers", value: "189", change: "+8.3%", icon: Heart, color: "text-pink-500", bg: "bg-pink-100" },
    { label: "Avg. Order Value", value: "₹1,240", change: "+5.7%", icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Satisfaction Rate", value: "4.8/5", change: "+0.2", icon: Star, color: "text-amber-500", bg: "bg-amber-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 rounded-xl">
              <Heart className="h-6 w-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Customer Insights</h1>
          </div>
          <p className="text-sm text-gray-500 font-medium">Understand your customers better and grow your business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Top Customers */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Top Customers
              </h2>
              <p className="text-sm text-gray-500 mt-1">Your most loyal customers by number of orders.</p>
            </div>
            <div className="divide-y divide-gray-50">
              {topCustomers.map((customer, i) => (
                <motion.div
                  key={customer.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center justify-between p-4 px-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {customer.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{customer.spent}</p>
                    <p className="text-xs text-gray-500">{customer.orders} orders</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Customer Locations */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-500" />
                Where They Are
              </h2>
              <p className="text-sm text-gray-500 mt-1">Customer distribution by city.</p>
            </div>
            <div className="p-6 space-y-4">
              {locationData.map((loc, i) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{loc.city}</span>
                    <span className="text-sm font-bold text-gray-900">{loc.customers}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${loc.percentage}%` }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Most Popular Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">Products your customers love the most.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Views</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Orders</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Revenue</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {popularProducts.map((product, i) => (
                  <motion.tr
                    key={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Eye className="w-4 h-4 text-gray-400" />
                        {product.views}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{product.orders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900">{product.revenue}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-green-600">
                        {((product.orders / product.views) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
