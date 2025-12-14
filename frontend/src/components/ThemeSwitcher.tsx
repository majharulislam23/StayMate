"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl bg-dark-800/50 dark:bg-white/10 hover:bg-dark-700/50 dark:hover:bg-white/20 border border-dark-700/50 dark:border-white/10 transition-all duration-300 group"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <Sun
                    className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ${
                        theme === "dark"
                            ? "opacity-0 rotate-90 scale-0"
                            : "opacity-100 rotate-0 scale-100"
                    }`}
                />
                {/* Moon Icon */}
                <Moon
                    className={`absolute inset-0 w-5 h-5 text-primary-400 transition-all duration-300 ${
                        theme === "dark"
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-0"
                    }`}
                />
            </div>

            {/* Glow effect on hover */}
            <div
                className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    theme === "dark"
                        ? "bg-primary-500/20 shadow-glow-sm"
                        : "bg-amber-500/20"
                }`}
            />
        </button>
    );
}
