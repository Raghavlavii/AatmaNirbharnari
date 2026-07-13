"use client";

import React, { useState } from "react";
import { X, Send, AlertCircle, CheckCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface InquiryModalProps {
  businessId: string;
  businessName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ businessId, businessName, isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          businessId,
          category: "General Inquiry"
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData({ customerName: "", customerEmail: "", subject: "", message: "" });
        }, 2000);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to connect to server.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-lg">Message {businessName}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
              <p className="text-gray-500">The business owner has received your inquiry and will reply to your email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center text-sm font-medium">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="e.g. Bulk Order Inquiry"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                  placeholder="How can they help you?"
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
