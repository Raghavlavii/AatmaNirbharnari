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
  Heart
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

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
    { name: "Total Revenue", value: "₹0", change: "+0%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Active Customers", value: "0", change: "+0%", icon: Users, color: "text-pink-500", bg: "bg-pink-100" },
    { name: "Products Listed", value: businesses.length.toString(), change: businesses.length > 0 ? "+100%" : "0%", icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Unread Messages", value: "0", change: "0%", icon: MessageSquare, color: "text-pink-500", bg: "bg-pink-100" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Priya Sharma", product: "Demo Product 1", amount: "₹450", status: "Completed" },
    { id: "ORD-002", customer: "Anjali Gupta", product: "Demo Product 2", amount: "₹2,100", status: "Processing" },
  ];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50/50">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500">{user?.fullName || "Entrepreneur"}!</span> ✨
            </h1>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Here is what&apos;s happening with your business today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="inline-flex items-center justify-center p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-purple-700 hover:bg-purple-50 transition-colors shadow-sm">
              <Bell className="h-5 w-5" />
            </button>
            <Link
              href="/add-business"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-800 hover:to-pink-600 transition-all hover:shadow-md"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-sm border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <dt>
                <div className={`absolute rounded-xl p-3 ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.change.startsWith("+") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change}
                </p>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500 flex items-center">
                      View all <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Orders Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Business Setup Checklist */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg leading-6 font-semibold text-gray-900 mb-4">
                Business Setup Checklist
              </h3>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mb-6">You are 60% done with your profile setup.</p>
              
              <ul className="space-y-3">
                <li className="flex items-center text-sm font-medium text-gray-900">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">✓</div>
                  Register Account
                </li>
                <li className="flex items-center text-sm font-medium text-gray-900">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">✓</div>
                  Verify Email
                </li>
                <li className="flex items-center text-sm font-medium text-gray-900">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">✓</div>
                  Create Business Profile
                </li>
                <li className="flex items-center text-sm font-medium text-gray-500">
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-3">4</div>
                  Upload Product Images
                  <button className="ml-auto text-purple-600 hover:text-purple-700 font-semibold text-xs">Add Now</button>
                </li>
                <li className="flex items-center text-sm font-medium text-gray-500">
                  <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-3">5</div>
                  Set Availability Schedule
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg leading-6 font-semibold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-purple-600" />
                  Recent Orders
                </h3>
                <button className="text-sm font-medium text-pink-500 hover:text-pink-600">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Completed" ? "bg-green-100 text-green-800"
                              : order.status === "Processing" ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions & Store Status */}
          <div className="space-y-8">
            
            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/businesses" className="group flex items-center p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all">
                  <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Store className="h-5 w-5 text-purple-700" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">My Storefront</p>
                    <p className="text-xs text-gray-500">Manage your business profile</p>
                  </div>
                </Link>
                <Link href="/customer" className="group flex items-center p-3 rounded-xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all">
                  <div className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-200 transition-colors">
                    <Heart className="h-5 w-5 text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Customer Insights</p>
                    <p className="text-xs text-gray-500">View what your customers love</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-gradient-to-br from-purple-700 to-pink-500 rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
              <h3 className="text-lg font-semibold mb-2 relative z-10">Need Help Growing?</h3>
              <p className="text-sm text-purple-100 mb-4 relative z-10">
                Join our community of women entrepreneurs and get expert advice on scaling your business.
              </p>
              <button className="w-full bg-white text-purple-700 font-medium py-2 px-4 rounded-lg text-sm hover:bg-gray-50 transition-colors relative z-10 shadow-sm">
                Join Community Forum
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}