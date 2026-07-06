"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, Clock, CheckCircle2, Circle, Send, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface Inquiry {
  id: string;
  customer: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied";
  category: string;
}

export default function MessagesPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">("all");
  const [search, setSearch] = useState("");

  const inquiries: Inquiry[] = [
    { id: "INQ-001", customer: "Priya Sharma", subject: "Bulk order for handcrafted jhumkas", message: "Hi, I'm interested in placing a bulk order of 50 pairs for a corporate event. Can you offer a wholesale price?", date: "2 hours ago", status: "unread", category: "Handicrafts" },
    { id: "INQ-002", customer: "Anjali Gupta", subject: "Custom saree stitching inquiry", message: "I would like to get a custom blouse stitched to match my saree. Do you offer this service? What are the charges?", date: "5 hours ago", status: "unread", category: "Tailoring" },
    { id: "INQ-003", customer: "Sneha Reddy", subject: "Delivery timeline for terracotta pots", message: "I placed an order 3 days ago. Can you update me on the shipping status?", date: "1 day ago", status: "read", category: "Handicrafts" },
    { id: "INQ-004", customer: "Neha Singh", subject: "Ayurvedic product ingredients", message: "Could you share the full ingredient list for the skin care kit? I have sensitive skin and need to check.", date: "2 days ago", status: "replied", category: "Beauty" },
    { id: "INQ-005", customer: "Kavita Patel", subject: "Tiffin service for office", message: "We need daily tiffin service for 20 employees. Can you customize the menu? Do you deliver to Whitefield area?", date: "3 days ago", status: "replied", category: "Tiffin Service" },
    { id: "INQ-006", customer: "Meera Joshi", subject: "Return policy question", message: "I received a damaged item. What is the return or replacement policy?", date: "4 days ago", status: "read", category: "Fashion" },
  ];

  const filtered = inquiries.filter((inq) => {
    const matchesFilter = filter === "all" || inq.status === filter;
    const matchesSearch = search
      ? inq.customer.toLowerCase().includes(search.toLowerCase()) ||
        inq.subject.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesFilter && matchesSearch;
  });

  const statusIcon = (status: Inquiry["status"]) => {
    switch (status) {
      case "unread": return <Circle className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />;
      case "read": return <Clock className="w-3.5 h-3.5 text-amber-500" />;
      case "replied": return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
    }
  };

  const statusLabel = (status: Inquiry["status"]) => {
    switch (status) {
      case "unread": return "New";
      case "read": return "Seen";
      case "replied": return "Replied";
    }
  };

  const filters: { label: string; value: typeof filter }[] = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Read", value: "read" },
    { label: "Replied", value: "replied" },
  ];

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-xl">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inquiries</h1>
            {unreadCount > 0 && (
              <span className="ml-2 px-2.5 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 font-medium">Manage messages and inquiries from your customers.</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-900 placeholder-gray-400 transition-all"
              />
            </div>
            <div className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                    filter === f.value
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No inquiries found</h3>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((inq, i) => (
              <motion.div
                key={inq.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={clsx(
                  "group bg-white rounded-2xl border p-5 transition-all hover:shadow-md cursor-pointer",
                  inq.status === "unread"
                    ? "border-purple-200 bg-purple-50/30"
                    : "border-gray-100"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {statusIcon(inq.status)}
                      <span className="text-sm font-bold text-gray-900">{inq.customer}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">{inq.category}</span>
                    </div>
                    <h3 className={clsx(
                      "text-sm mb-1",
                      inq.status === "unread" ? "font-bold text-gray-900" : "font-medium text-gray-700"
                    )}>
                      {inq.subject}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{inq.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400 whitespace-nowrap">{inq.date}</span>
                    <span className={clsx(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      inq.status === "unread" && "bg-purple-100 text-purple-700",
                      inq.status === "read" && "bg-amber-100 text-amber-700",
                      inq.status === "replied" && "bg-green-100 text-green-700",
                    )}>
                      {statusLabel(inq.status)}
                    </span>
                  </div>
                </div>

                {/* Quick Reply Hint */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Send className="w-3.5 h-3.5" />
                    Click to view full conversation
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-500" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
