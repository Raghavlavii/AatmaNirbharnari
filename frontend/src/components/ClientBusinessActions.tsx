"use client";

import React, { useState } from "react";
import { MessageSquare, Flag } from "lucide-react";
import InquiryModal from "./InquiryModal";
import ReportModal from "./ReportModal";

interface ClientBusinessActionsProps {
  businessId: string;
  businessName: string;
}

export default function ClientBusinessActions({ businessId, businessName }: ClientBusinessActionsProps) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <button 
          onClick={() => setIsInquiryOpen(true)}
          className="w-full bg-gradient-to-r from-rose-700 to-orange-500 hover:from-rose-800 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex justify-center items-center"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Send Inquiry
        </button>

        <button 
          onClick={() => setIsReportOpen(true)}
          className="w-full bg-white text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 font-semibold py-3 px-6 rounded-2xl transition-colors flex justify-center items-center text-sm"
        >
          <Flag className="w-4 h-4 mr-2" />
          Report this Business
        </button>
      </div>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        businessId={businessId}
        businessName={businessName}
      />
      
      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        businessId={businessId}
        businessName={businessName}
      />
    </>
  );
}
