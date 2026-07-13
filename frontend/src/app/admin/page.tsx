"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Store, 
  AlertCircle, 
  CheckCircle,
  XCircle,
  TrendingUp,
  Search
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [adminStats, setAdminStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/stats`);
        const data = await response.json();
        if (data.success) {
          setAdminStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { name: "Total Businesses", value: adminStats?.totalBusinesses || 0, icon: Store, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Total Users", value: adminStats?.totalUsers || 0, icon: Users, color: "text-pink-500", bg: "bg-pink-100" },
    { name: "Customer Inquiries", value: adminStats?.totalInquiries || 0, icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-100" },
    { name: "Profile Completion Rate", value: `${adminStats?.completionRate || 0}%`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  ];

  const pendingApprovals = [
    { id: "BIZ-102", name: "Ananya's Boutique", category: "Fashion", owner: "Ananya Desai", date: "2024-03-15" },
    { id: "BIZ-103", name: "Taste of Home", category: "Tiffin Service", owner: "Kavita Rao", date: "2024-03-14" },
    { id: "BIZ-104", name: "Glow & Go", category: "Beauty", owner: "Simran Kaur", date: "2024-03-14" },
    { id: "BIZ-105", name: "Creative Clay", category: "Handicrafts", owner: "Pooja Patel", date: "2024-03-12" },
  ];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="pb-12 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Overview</h1>
            <p className="mt-2 text-sm text-gray-500 font-medium">Monitor platform activity and manage approvals.</p>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses or users..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 outline-none shadow-sm w-64"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((item) => (
            <div key={item.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center">
              <div className={`rounded-xl p-4 ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{item.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Approvals Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg leading-6 font-semibold text-gray-900 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
              Business Approvals
            </h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === 'pending' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setActiveTab("approved")}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === 'approved' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Recently Approved
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {pendingApprovals.map((biz) => (
                  <tr key={biz.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{biz.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{biz.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-50 text-purple-700">
                        {biz.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{biz.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{biz.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-lg mr-2 transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
