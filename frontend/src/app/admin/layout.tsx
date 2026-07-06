import React from "react";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50/50 min-h-[calc(100vh-73px)] relative z-0">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
