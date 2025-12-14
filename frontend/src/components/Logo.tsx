"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl";
    showText?: boolean;
    linkTo?: string | null;
    className?: string;
    animated?: boolean;
}

export default function Logo({
    size = "md",
    showText = true,
    linkTo = "/",
    className = "",
    animated = true,
}: LogoProps) {
    const { isDark } = useTheme();

    const sizes = {
        sm: {
            icon: "w-7 h-7",
            iconInner: "w-4 h-4",
            text: "text-base",
            gap: "gap-2",
        },
        md: {
            icon: "w-9 h-9",
            iconInner: "w-5 h-5",
            text: "text-lg",
            gap: "gap-2",
        },
        lg: {
            icon: "w-11 h-11",
            iconInner: "w-6 h-6",
            text: "text-xl",
            gap: "gap-2.5",
        },
        xl: {
            icon: "w-14 h-14",
            iconInner: "w-8 h-8",
            text: "text-2xl",
            gap: "gap-3",
        },
    };

    const currentSize = sizes[size];

    const LogoContent = () => (
        <div
            className={`flex items-center ${currentSize.gap} ${className} ${
                animated ? "group" : ""
            }`}
        >
            {/* Logo Icon */}
            <div className="relative">
                {/* Main icon container */}
                <div
                    className={`relative ${currentSize.icon} rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${
                        animated ? "group-hover:scale-105" : ""
                    } ${
                        isDark
                            ? "bg-white/10 border border-white/10"
                            : "bg-slate-900 shadow-sm"
                    }`}
                >
                    {/* Simple House + Key Icon */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${currentSize.iconInner} relative z-10`}
                    >
                        {/* House */}
                        <path
                            d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                            stroke={isDark ? "#fff" : "#fff"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        {/* Door */}
                        <path
                            d="M9 21V14H15V21"
                            stroke={isDark ? "#fff" : "#fff"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Key Circle (represents mate/connection) */}
                        <circle
                            cx="12"
                            cy="9"
                            r="2"
                            stroke={isDark ? "#818cf8" : "#a5b4fc"}
                            strokeWidth="1.5"
                            fill="none"
                        />
                    </svg>
                </div>
            </div>

            {/* Text Logo */}
            {showText && (
                <div className="flex items-baseline">
                    <span
                        className={`font-semibold tracking-tight ${currentSize.text} ${
                            isDark ? "text-white" : "text-slate-900"
                        } transition-colors duration-300`}
                    >
                        Stay
                    </span>
                    <span
                        className={`font-semibold tracking-tight ${currentSize.text} ${
                            isDark ? "text-slate-400" : "text-slate-500"
                        } transition-colors duration-300`}
                    >
                        Mate
                    </span>
                </div>
            )}
        </div>
    );

    if (linkTo) {
        return (
            <Link href={linkTo} className="inline-flex">
                <LogoContent />
            </Link>
        );
    }

    return <LogoContent />;
}

// Alternative minimal logo for footer or small spaces
export function LogoMinimal({
    isDark,
    className = "",
}: {
    isDark?: boolean;
    className?: string;
}) {
    const theme = useTheme();
    const dark = isDark ?? theme.isDark;

    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            <div
                className={`w-5 h-5 rounded-md flex items-center justify-center ${
                    dark ? "bg-white/10" : "bg-slate-900"
                }`}
            >
                <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                    <path
                        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            </div>
            <span
                className={`font-medium text-sm ${
                    dark ? "text-slate-400" : "text-slate-600"
                }`}
            >
                StayMate
            </span>
        </div>
    );
}

// Animated logo for loading screens
export function LogoAnimated({ size = "xl" }: { size?: "lg" | "xl" }) {
    const { isDark } = useTheme();

    const sizes = {
        lg: { container: "w-14 h-14", icon: "w-7 h-7" },
        xl: { container: "w-20 h-20", icon: "w-10 h-10" },
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                {/* Subtle pulse ring */}
                <div
                    className={`absolute inset-0 ${sizes[size].container} rounded-2xl ${
                        isDark ? "bg-white/5" : "bg-slate-900/10"
                    } animate-pulse`}
                />

                {/* Main icon */}
                <div
                    className={`relative ${sizes[size].container} rounded-2xl flex items-center justify-center ${
                        isDark
                            ? "bg-white/10 border border-white/10"
                            : "bg-slate-900 shadow-lg"
                    }`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`${sizes[size].icon}`}
                    >
                        <path
                            d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        <path
                            d="M9 21V14H15V21"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="12"
                            cy="9"
                            r="2"
                            stroke={isDark ? "#818cf8" : "#a5b4fc"}
                            strokeWidth="1.5"
                            fill="none"
                            className="animate-pulse"
                        />
                    </svg>
                </div>
            </div>

            {/* Text */}
            <div className="flex items-baseline">
                <span
                    className={`text-xl font-semibold ${
                        isDark ? "text-white" : "text-slate-900"
                    }`}
                >
                    Stay
                </span>
                <span
                    className={`text-xl font-semibold ${
                        isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                >
                    Mate
                </span>
            </div>
        </div>
    );
}
