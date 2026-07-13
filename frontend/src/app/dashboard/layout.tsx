import React from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-73px)] relative z-0">
      <Sidebar role="entrepreneur" />
      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
