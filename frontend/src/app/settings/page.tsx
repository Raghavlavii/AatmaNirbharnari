"use client";

import React, { useState } from "react";
import { User, Store, Bell, Shield, Save, CheckCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock Form State
  const [profileData, setProfileData] = useState({
    fullName: "Radhika Sharma",
    email: "radhika@example.com",
    phone: "+91 98765 43210",
  });

  const [businessData, setBusinessData] = useState({
    businessName: "Radhika's Handlooms",
    category: "Handicrafts",
    description: "Authentic handwoven sarees, dupattas, and ethnic wear directly from artisans.",
  });

  const [notifications, setNotifications] = useState({
    emailInquiries: true,
    smsAlerts: false,
    marketingUpdates: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto pt-24 lg:pt-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
            <p className="mt-2 text-gray-500 font-medium">Manage your personal and business preferences.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            
            {/* Sidebar Navigation inside Settings */}
            <div className="w-full md:w-64 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <User className="w-5 h-5 mr-3" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab("business")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'business' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Store className="w-5 h-5 mr-3" /> Business Details
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'notifications' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Bell className="w-5 h-5 mr-3" /> Notifications
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${activeTab === 'security' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Shield className="w-5 h-5 mr-3" /> Security
                </button>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
              <form onSubmit={handleSave}>
                
                {activeTab === "profile" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="text" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "business" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Business Details</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                        <input 
                          type="text" 
                          value={businessData.businessName}
                          onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                          value={businessData.category}
                          onChange={(e) => setBusinessData({...businessData, category: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white"
                        >
                          <option value="Handicrafts">Handicrafts</option>
                          <option value="Tiffin Service">Tiffin Service</option>
                          <option value="Fashion">Fashion & Tailoring</option>
                          <option value="Beauty">Beauty & Wellness</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                        <textarea 
                          rows={4}
                          value={businessData.description}
                          onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-bold text-gray-900">Email Alerts for Inquiries</p>
                          <p className="text-sm text-gray-500">Receive an email instantly when a customer messages you.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={notifications.emailInquiries}
                          onChange={(e) => setNotifications({...notifications, emailInquiries: e.target.checked})}
                          className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-bold text-gray-900">SMS Alerts</p>
                          <p className="text-sm text-gray-500">Get text messages for important platform updates.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={notifications.smsAlerts}
                          onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})}
                          className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Security</h2>
                    <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                      For security reasons, please visit the password reset page to change your password, or contact admin support to delete your account.
                    </p>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end items-center">
                  {saveSuccess && (
                    <span className="text-green-600 font-semibold flex items-center mr-4 animate-in fade-in">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      Changes saved!
                    </span>
                  )}
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-800 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center"
                  >
                    {isSaving ? "Saving..." : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
