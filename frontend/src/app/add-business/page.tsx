"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, MapPin, Phone, Mail, Globe, CheckCircle, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { API_BASE_URL } from "@/lib/api";

export default function AddBusinessPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "Fashion",
    description: "",
    location: "",
    phone: "",
    email: "",
    website: "",
  });

  const categories = ["Fashion", "Food", "Beauty", "Education", "Handicrafts", "Tailoring", "Tiffin Service"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first to add a business.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/business`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        alert(data.message || "Failed to create business");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3 } }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">You're All Set!</h2>
          <p className="text-gray-500 mb-8">
            Your business profile has been successfully created. Welcome to the Aatmanirbhar Nari community!
          </p>
          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-800 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header & Progress */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Register Your Business</h1>
          <p className="text-gray-500">Take the first step towards your entrepreneurial journey.</p>
          
          <div className="flex items-center justify-center mt-10">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300",
                  step >= num ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                )}>
                  {step > num ? <CheckCircle className="w-5 h-5" /> : num}
                </div>
                {num < 3 && (
                  <div className={clsx(
                    "w-16 md:w-24 h-1 mx-2 rounded-full transition-colors duration-300",
                    step > num ? "bg-purple-600" : "bg-gray-200"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden relative">
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            <AnimatePresence mode="wait">
              
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Store className="w-5 h-5 mr-2 text-purple-600" />
                      Basic Information
                    </h3>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-gray-900"
                      placeholder="e.g. Radhika's Handlooms"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer text-gray-900"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                    <textarea
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none text-gray-900"
                      placeholder="Describe what you sell or the services you provide..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-pink-500" />
                      Contact Details
                    </h3>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-900"
                        placeholder="contact@yourbusiness.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-900"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Website (Optional)</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-900"
                        placeholder="https://www.yourbusiness.com"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Location */}
              {step === 3 && (
                <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-500" />
                      Location Details
                    </h3>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City / Area</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-gray-900"
                      placeholder="e.g. Bandra, Mumbai"
                    />
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mt-6">
                    <p className="text-sm text-purple-700 flex items-start">
                      <span className="mr-2">💡</span>
                      Adding your accurate location helps local customers find you quickly on our marketplace.
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={clsx(
                  "flex items-center px-6 py-3 rounded-xl font-semibold transition-all",
                  step === 1 ? "opacity-0 cursor-default" : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                )}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>

              {step < 3 ? (
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold transition-all shadow-md"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-800 hover:to-pink-600 text-white rounded-xl font-bold transition-all shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </span>
                  ) : "Complete Registration"}
                </button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}