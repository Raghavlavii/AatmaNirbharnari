"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  MessageSquare, 
  BookOpen, 
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import clsx from "clsx";

export default function Sidebar({ role = "entrepreneur" }: { role?: "entrepreneur" | "admin" }) {
  const pathname = usePathname();

  const entrepreneurLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Store", href: "/businesses", icon: Store },
    { name: "Orders", href: "/customer", icon: ShoppingBag },
    { name: "Inquiries", href: "/messages", icon: MessageSquare },
    { name: "Guidance Hub", href: "/entrepreneur/guidance", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Approvals", href: "/admin/approvals", icon: ShieldCheck },
    { name: "Categories", href: "/admin/categories", icon: Store },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Learning Content", href: "/admin/learning", icon: BookOpen },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const links = role === "admin" ? adminLinks : entrepreneurLinks;

  return (
    <div className="w-64 glass-panel border-none min-h-[calc(100vh-32px)] hidden lg:flex flex-col sticky top-4 m-4 p-5 z-40">
      
      {/* Brand Logo inside Sidebar */}
      <Link href="/" className="flex items-center gap-3 px-2 mb-8 mt-2 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink to-brand-coral flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <span className="text-xl font-extrabold text-gradient tracking-tight">
          Aatmanirbhar Nari
        </span>
      </Link>

      <div className="mb-4 px-2">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          {role === "admin" ? "Admin Controls" : "Business Tools"}
        </p>
      </div>

      <nav className="space-y-1.5 flex-1">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center px-3 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-gradient-to-r from-brand-pink/10 to-transparent text-brand-pink" 
                  : "text-gray-500 hover:bg-gray-50/50 hover:text-gray-900"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-pink rounded-r-full"></div>
              )}
              <link.icon 
                className={clsx(
                  "mr-3 flex-shrink-0 h-5 w-5 transition-all duration-300",
                  isActive ? "text-brand-pink scale-110" : "text-gray-400 group-hover:text-gray-600 group-hover:scale-110"
                )} 
              />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Premium Support Widget */}
      {role === "entrepreneur" && (
        <div className="mt-8 p-5 bg-gradient-to-br from-brand-pink to-brand-coral rounded-3xl text-white shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-brand-peach opacity-20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="relative z-10">
            <h4 className="text-sm font-bold mb-1">Premium Support</h4>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">Need help scaling your home business?</p>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-sm">
              Contact Expert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
