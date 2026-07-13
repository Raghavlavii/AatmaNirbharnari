"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Video, FileText, ChevronRight, Calculator, MapPin, Tag } from "lucide-react";

export default function GuidanceHubPage() {
  const topics = [
    {
      id: "pricing",
      title: "Pricing Strategy",
      description: "Learn how to price your products for maximum profit and competitive edge.",
      icon: Tag,
      color: "bg-blue-100 text-blue-600",
      type: "Article",
      readTime: "5 min"
    },
    {
      id: "licensing",
      title: "Licensing Basics",
      description: "Understand the local regulations and licenses required for home businesses.",
      icon: MapPin,
      color: "bg-green-100 text-green-600",
      type: "Video",
      readTime: "12 min"
    },
    {
      id: "cost-estimation",
      title: "Cost Estimation Tool",
      description: "Calculate your raw materials and overheads accurately.",
      icon: Calculator,
      color: "bg-rose-100 text-rose-600",
      type: "Tool",
      readTime: "Interactive"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-12">
          <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 inline-block">
            Learning Center
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Business Guidance Hub</h1>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl">
            Access curated resources, tools, and tutorials designed specifically for women entrepreneurs starting from home.
          </p>
        </div>

        {/* Featured Resource */}
        <div className="bg-gradient-to-r from-rose-700 to-orange-500 rounded-3xl p-8 text-white shadow-lg mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="relative z-10 md:w-2/3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 inline-block">Featured</span>
            <h2 className="text-3xl font-bold mb-4">How to take beautiful product photos with your phone</h2>
            <p className="text-rose-100 mb-6 text-lg">
              Good photography increases sales by 40%. Learn the simple tricks to lighting and framing your products.
            </p>
            <button className="bg-white text-rose-700 font-bold py-3 px-6 rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Watch Tutorial
            </button>
          </div>
        </div>

        {/* Topics Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${topic.color}`}>
                <topic.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                  {topic.type === "Article" && <FileText className="w-3 h-3 mr-1" />}
                  {topic.type === "Video" && <Video className="w-3 h-3 mr-1" />}
                  {topic.type === "Tool" && <Calculator className="w-3 h-3 mr-1" />}
                  {topic.type}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-xs text-gray-500 font-medium">{topic.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {topic.description}
              </p>
              <Link
                href={`/entrepreneur/guidance/${topic.id}`}
                className="text-rose-600 font-semibold text-sm flex items-center group-hover:text-rose-700"
              >
                Start Learning
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
