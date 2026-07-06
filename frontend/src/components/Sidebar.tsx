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
    <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100 min-h-[calc(100vh-73px)] hidden lg:block sticky top-[73px] p-4">
      <div className="mb-6 px-3">
        <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          {role === "admin" ? "Admin Controls" : "Business Tools"}
        </p>
      </div>
      <nav className="space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-purple-50 text-purple-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <link.icon 
                className={clsx(
                  "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
                  isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-500"
                )} 
              />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {role === "entrepreneur" && (
        <div className="mt-8 mx-3 p-4 bg-gradient-to-br from-purple-700 to-pink-500 rounded-2xl text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>
          <p className="text-sm font-bold mb-1 relative z-10">Premium Support</p>
          <p className="text-xs text-purple-100 mb-3 relative z-10">Need help scaling your business?</p>
          <button className="w-full bg-white text-purple-700 text-xs font-semibold py-1.5 rounded-lg shadow-sm hover:bg-gray-50 transition-colors relative z-10">
            Contact Expert
          </button>
        </div>
      )}
    </div>
  );
}
