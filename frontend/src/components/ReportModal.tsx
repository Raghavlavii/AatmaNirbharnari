"use client";

import React, { useState } from "react";
import { X, Flag, AlertCircle, CheckCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface ReportModalProps {
  businessId: string;
  businessName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ businessId, businessName, isOpen, onClose }: ReportModalProps) {
  const [formData, setFormData] = useState({
    reportedBy: "",
    reporterEmail: "",
    subject: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_BASE_URL}/api/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          targetBusinessId: businessId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData({ reportedBy: "", reporterEmail: "", subject: "", description: "" });
        }, 2500);
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
        <div className="px-6 py-4 border-b border-red-100 flex justify-between items-center bg-red-50/50">
          <h3 className="font-bold text-red-700 text-lg flex items-center">
            <Flag className="w-5 h-5 mr-2" />
            Report {businessName}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Report Submitted</h4>
              <p className="text-gray-500">Our administrative team will review this report within 24-48 hours. Thank you for keeping our community safe.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center text-sm font-medium">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}
              
              <div className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-xl">
                Please provide details about your experience. False reports may result in account suspension.
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.reportedBy}
                  onChange={(e) => setFormData({...formData, reportedBy: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({...formData, reporterEmail: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Report</label>
                <select 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white"
                >
                  <option value="" disabled>Select a reason</option>
                  <option value="Fraudulent Business">Fraudulent Business or Scam</option>
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Service Never Delivered">Service Paid but Never Delivered</option>
                  <option value="Offensive Behavior">Offensive or Abusive Behavior</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none"
                  placeholder="Please provide specific details..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center transition-colors disabled:opacity-70"
              >
                {status === "loading" ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
