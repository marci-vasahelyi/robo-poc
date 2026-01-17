"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, ClipboardList, User } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Portfolio", href: "/portfolio", icon: LayoutDashboard },
        { name: "Risk Assessment", href: "/quiz", icon: ClipboardList },
    ];

    if (pathname === "/" || pathname?.startsWith("/login")) return null;

    return (
        <aside className="fixed left-0 top-0 h-full w-64 border-r border-zinc-800 bg-zinc-950 p-6 space-y-8 z-40 hidden md:block">
            <div className="flex items-center space-x-2 font-bold text-xl tracking-tighter">
                <Zap className="h-6 w-6 text-emerald-500" />
                <span>ROBO<span className="text-emerald-500">ADVISOR</span></span>
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                            }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="absolute bottom-10 left-6 right-6 pt-6 border-t border-zinc-900">
                <div className="flex items-center space-x-3 text-zinc-400">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-white truncate">Investor Profile</p>
                        <p className="text-[10px] truncate">Active Member</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
