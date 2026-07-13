"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  MessageSquare,
  ArrowRight,
  Store,
  PlusCircle,
  Bell,
  Activity,
  Heart,
  CheckCircle2,
  Circle,
  MoreVertical
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import clsx from "clsx";

const growthData = [
  { name: 'Jan', revenue: 1200, target: 1000 },
  { name: 'Feb', revenue: 2100, target: 1500 },
  { name: 'Mar', revenue: 1800, target: 2000 },
  { name: 'Apr', revenue: 3200, target: 2500 },
  { name: 'May', revenue: 2800, target: 3000 },
  { name: 'Jun', revenue: 4100, target: 3500 },
];

const sparklineData = [
  { value: 10 }, { value: 15 }, { value: 8 }, { value: 20 }, { value: 18 }, { value: 25 }
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        window.location.href = "/login";
        return;
      }
      
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      try {
        const response = await fetch(`${API_BASE_URL}/api/business`);
        const data = await response.json();
        if (data.success) {
          // Filter businesses to only show ones owned by the logged in user
          const myBusinesses = data.businesses.filter(
            (b: any) => b.owner?._id === parsedUser.id || b.owner === parsedUser.id
          );
          setBusinesses(myBusinesses);
        }
      } catch (error) {
        console.error("Failed to fetch businesses", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { name: "Total Revenue", value: "₹24,500", change: "+12.5%", icon: TrendingUp, color: "text-brand-pink", bg: "bg-brand-pink/10" },
    { name: "Active Customers", value: "128", change: "+4.2%", icon: Users, color: "text-brand-coral", bg: "bg-brand-coral/10" },
    { name: "Products Listed", value: businesses.length.toString(), change: businesses.length > 0 ? "+100%" : "0%", icon: ShoppingBag, color: "text-brand-pink", bg: "bg-brand-pink/10" },
    { name: "Unread Messages", value: "5", change: "-2%", icon: MessageSquare, color: "text-brand-coral", bg: "bg-brand-coral/10" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Priya Sharma", product: "Handcrafted Vase", amount: "₹450", status: "Completed", date: "Today, 10:23 AM" },
    { id: "ORD-002", customer: "Anjali Gupta", product: "Silk Saree", amount: "₹2,100", status: "Processing", date: "Today, 09:15 AM" },
    { id: "ORD-003", customer: "Ritu Patel", product: "Organic Spices Set", amount: "₹850", status: "Pending", date: "Yesterday, 04:30 PM" },
    { id: "ORD-004", customer: "Sneha Reddy", product: "Terracotta Lamps", amount: "₹1,200", status: "Completed", date: "Yesterday, 11:00 AM" },
  ];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;
  }

  return (
    <div className="pb-12 mt-6 lg:mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between py-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome back, <span className="text-gradient">{user?.fullName || "Entrepreneur"}</span> 👋
            </h1>
            <p className="mt-2 text-base text-gray-500 font-medium max-w-xl">
              Here's an overview of your business performance today. You have <span className="text-brand-pink font-semibold">3 new orders</span> to process.
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/add-business"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl shadow-lg shadow-brand-pink/20 text-sm font-bold text-white bg-gradient-to-r from-brand-pink to-brand-coral hover:scale-105 transition-all duration-300"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((item, idx) => (
            <div
              key={item.name}
              className="relative glass-panel p-6 group cursor-default overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <span
                  className={clsx(
                    "text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1",
                    item.change.startsWith("+") ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                  )}
                >
                  {item.change.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : null}
                  {item.change}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-500 mb-1">{item.name}</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{item.value}</h3>
              
              {/* Sparkline Background */}
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="value" stroke={idx % 2 === 0 ? "#C83E6D" : "#FF7A59"} strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Revenue Trend Chart */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Revenue Growth</h3>
                  <p className="text-sm text-gray-500 font-medium">Monthly performance vs target</p>
                </div>
                <select className="bg-white/50 border border-gray-100 text-sm font-semibold text-gray-600 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-pink/20">
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C83E6D" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#C83E6D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                      cursor={{ stroke: '#C83E6D', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#C83E6D" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Line type="monotone" dataKey="target" stroke="#FF7A59" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="glass-panel overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100/50 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  Recent Orders
                </h3>
                <button className="text-sm font-bold text-brand-pink hover:text-brand-coral transition-colors">
                  View all orders
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/50">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/40 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{order.id}</div>
                          <div className="text-xs text-gray-500">{order.customer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-700">{order.product}</div>
                          <div className="text-xs text-gray-400">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={clsx(
                            "px-3 py-1 inline-flex text-xs font-bold rounded-full",
                            order.status === "Completed" ? "bg-green-100 text-green-700" : 
                            order.status === "Processing" ? "bg-blue-100 text-blue-700" : 
                            "bg-orange-100 text-orange-700"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-brand-pink transition-colors">
                            <MoreVertical className="w-5 h-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-8">
            
            {/* Task Checklist Widget */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Today's Tasks</h3>
                <span className="bg-brand-pink/10 text-brand-pink text-xs font-bold px-2.5 py-1 rounded-full">3 Left</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 group cursor-pointer">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-400 line-through">Review inventory stock</p>
                    <p className="text-xs text-gray-400">Completed at 09:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group cursor-pointer bg-white/40 p-3 -mx-3 rounded-xl transition-colors">
                  <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0 group-hover:text-brand-pink transition-colors" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Package Order #ORD-002</p>
                    <p className="text-xs text-brand-coral font-medium mt-1">Due in 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group cursor-pointer hover:bg-white/40 p-3 -mx-3 rounded-xl transition-colors">
                  <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0 group-hover:text-brand-pink transition-colors" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Update product descriptions</p>
                    <p className="text-xs text-gray-500 mt-1">Marketplace optimization</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group cursor-pointer hover:bg-white/40 p-3 -mx-3 rounded-xl transition-colors">
                  <Circle className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0 group-hover:text-brand-pink transition-colors" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Reply to customer inquiries</p>
                    <p className="text-xs text-gray-500 mt-1">5 unread messages</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:text-brand-pink hover:border-brand-pink/30 hover:bg-brand-pink/5 transition-all flex items-center justify-center gap-2">
                <PlusCircle className="w-4 h-4" /> Add Task
              </button>
            </div>

            {/* Quick Actions Widget */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/businesses" className="group flex items-center p-3 rounded-2xl bg-white/40 hover:bg-white/70 transition-all border border-transparent hover:border-brand-pink/20 shadow-sm">
                  <div className="bg-brand-pink/10 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                    <Store className="h-5 w-5 text-brand-pink" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-900">My Storefront</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Manage your listings</p>
                  </div>
                </Link>
                <Link href="/customer" className="group flex items-center p-3 rounded-2xl bg-white/40 hover:bg-white/70 transition-all border border-transparent hover:border-brand-coral/20 shadow-sm">
                  <div className="bg-brand-coral/10 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                    <Heart className="h-5 w-5 text-brand-coral" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-900">Customer Insights</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">View analytics</p>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}