"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
    LayoutGrid,
    MessageCircle,
    Bell,
    User,
    Settings,
    LogOut,
    X,
    HelpCircle,
    Home,
} from "lucide-react";

interface QuickAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    iconBg: string;
    iconColor: string;
    onClick?: () => void;
}

export default function QuickAccessFAB() {
    const { isDark } = useTheme();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Clean up timeouts on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        hoverTimeoutRef.current = setTimeout(() => {
            setIsOpen(true);
        }, 100);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        closeTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const quickActions: QuickAction[] = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <Home size={18} strokeWidth={1.5} />,
            href: "/dashboard",
            iconBg: isDark ? "bg-slate-700/80" : "bg-white",
            iconColor: isDark ? "text-slate-300" : "text-slate-600",
        },
        {
            id: "messages",
            label: "Messages",
            icon: <MessageCircle size={18} strokeWidth={1.5} />,
            href: "/messages",
            iconBg: isDark ? "bg-blue-500/20" : "bg-blue-50",
            iconColor: isDark ? "text-blue-400" : "text-blue-600",
        },
        {
            id: "notifications",
            label: "Notifications",
            icon: <Bell size={18} strokeWidth={1.5} />,
            href: "/notifications",
            iconBg: isDark ? "bg-amber-500/20" : "bg-amber-50",
            iconColor: isDark ? "text-amber-400" : "text-amber-600",
        },
        {
            id: "profile",
            label: "Profile",
            icon: <User size={18} strokeWidth={1.5} />,
            href: "/dashboard",
            iconBg: isDark ? "bg-violet-500/20" : "bg-violet-50",
            iconColor: isDark ? "text-violet-400" : "text-violet-600",
        },
        {
            id: "settings",
            label: "Settings",
            icon: <Settings size={18} strokeWidth={1.5} />,
            href: "/dashboard",
            iconBg: isDark ? "bg-slate-700/80" : "bg-white",
            iconColor: isDark ? "text-slate-300" : "text-slate-600",
        },
        {
            id: "logout",
            label: "Sign Out",
            icon: <LogOut size={18} strokeWidth={1.5} />,
            href: "#",
            onClick: () => {
                logout();
                setIsOpen(false);
            },
            iconBg: isDark ? "bg-red-500/20" : "bg-red-50",
            iconColor: isDark ? "text-red-400" : "text-red-600",
        },
    ];

    // Radial Layout Configuration
    // INCREASED RADIUS to prevent overlap
    const RADIUS = 150; 
    const TOTAL_ANGLE = 95; // Span a bit more than 90 degrees for breathing room
    const START_ANGLE = 180; // Starting at 9 o'clock (Left)

    if (!user) return null;

    return (
        <div
            ref={containerRef}
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* The Floating Action Items */}
            <div className="absolute inset-0 flex items-center justify-center">
                {quickActions.map((action, index) => {
                    const step = TOTAL_ANGLE / (quickActions.length - 1);
                    const angleInDegrees = START_ANGLE + index * step;
                    const angleInRadians = (angleInDegrees * Math.PI) / 180;

                    const x = RADIUS * Math.cos(angleInRadians);
                    const y = RADIUS * Math.sin(angleInRadians);

                    return (
                        <div
                            key={action.id}
                            className="absolute flex items-center justify-center transition-all duration-300 ease-out"
                            style={{
                                transform: isOpen
                                    ? `translate(${x}px, ${y}px) scale(1)`
                                    : `translate(0px, 0px) scale(0)`,
                                opacity: isOpen ? 1 : 0,
                                transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                            }}
                        >
                            <Link
                                href={action.href}
                                onClick={action.onClick}
                                className={`
                                    relative group flex items-center justify-center w-10 h-10 rounded-full
                                    shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200
                                    ${action.iconBg} ${action.iconColor}
                                    ${
                                        isDark
                                            ? "border border-white/10 shadow-black/40"
                                            : "border border-slate-100 shadow-slate-200/60"
                                    }
                                `}
                            >
                                {action.icon}

                                {/* Tooltip */}
                                <div
                                    className={`
                                        absolute px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                                        shadow-lg z-50
                                        ${
                                            isDark
                                                ? "bg-slate-800 text-white border border-slate-700"
                                                : "bg-white text-slate-800 border border-slate-100"
                                        }
                                    `}
                                    style={{
                                        position: "absolute",
                                        top: "120%", // Push it down below the icon
                                    }}
                                >
                                    {action.label}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Main Trigger Button */}
            <div
                className={`
                    relative w-14 h-14 rounded-2xl
                    flex items-center justify-center
                    transition-all duration-300 ease-out cursor-pointer z-10
                    ${
                        isDark
                            ? "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/40"
                            : "bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30"
                    }
                    ${isOpen ? "rotate-45 rounded-full" : "rotate-0"}
                `}
                aria-label="Quick Access Menu"
            >
                <LayoutGrid
                    size={24}
                    strokeWidth={1.5}
                    className={`transition-all duration-300 ${
                        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
                />
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                     isOpen ? "scale-100 opacity-100 -rotate-45" : "scale-0 opacity-0 rotate-45"
                }`}>
                     <X size={24} strokeWidth={1.5} />
                </div>
            </div>
            
            {/* Backdrop */}
             <div
                className={`
                    fixed inset-0 z-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 pointer-events-none
                    ${isOpen ? "opacity-100 lg:hidden" : "opacity-0"}
                `} 
            />
        </div>
    );
}
