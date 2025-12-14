"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import { userSearchApi } from "@/lib/api";
import { User } from "@/types/auth";
import {
    Search,
    MapPin,
    User as UserIcon,
    Loader2,
    MessageSquare,
    Shield
} from "lucide-react";

export default function FindRoommatesPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { isDark } = useTheme();

    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Initial check
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [authLoading, isAuthenticated, router]);

    // Handle search
    const handleSearch = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        if (!searchQuery.trim()) return;

        try {
            setIsLoading(true);
            const results = await userSearchApi.searchUsers(searchQuery);
            setUsers(results);
            setHasSearched(true);
        } catch (error) {
            console.error("Failed to search users:", error);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    // Initial search or random suggestions could go here
    // For now, we'll just wait for user input or show a clean state

    if (authLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                    <Loader2 className={`w-8 h-8 animate-spin ${isDark ? "text-primary-400" : "text-primary-600"}`} />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div
                className={`h-[calc(100vh-120px)] flex flex-col rounded-xl overflow-hidden border ${
                    isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"
                }`}
            >
                {/* Header Section */}
                <div className={`flex-shrink-0 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                                    Find Roommates
                                </h1>
                                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    Search for compatible roommates in your area
                                </p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, location, or interests..."
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all ${
                                    isDark
                                        ? "bg-dark-900/50 border-white/10 text-white placeholder-slate-500 focus:border-primary-500/50"
                                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-500"
                                }`}
                            />
                            <Search
                                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                                    isDark ? "text-slate-500" : "text-slate-400"
                                }`}
                            />
                            <button
                                type="submit"
                                className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                    isDark
                                        ? "bg-primary-600 hover:bg-primary-500 text-white"
                                        : "bg-primary-600 hover:bg-primary-700 text-white"
                                }`}
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Filters - Placeholder for now */}
                    <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                isDark
                                    ? "bg-primary-500 text-white"
                                    : "bg-slate-900 text-white"
                            }`}
                        >
                            All
                        </button>
                        <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                isDark
                                    ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }`}
                        >
                            Verified
                        </button>
                        <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                isDark
                                    ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }`}
                        >
                            Students
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className={`flex-1 overflow-y-auto p-4 ${isDark ? "bg-dark-900/20" : "bg-slate-50/50"}`}>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <Loader2 className={`w-8 h-8 animate-spin mb-2 ${isDark ? "text-primary-400" : "text-primary-600"}`} />
                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                Searching roommates...
                            </p>
                        </div>
                    ) : users.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className={`p-4 rounded-xl border transition-all ${
                                        isDark
                                            ? "bg-dark-800/50 border-white/10 hover:border-white/20"
                                            : "bg-white border-slate-200 hover:border-primary-200 hover:shadow-sm"
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="relative">
                                            {user.profilePictureUrl ? (
                                                <img
                                                    src={user.profilePictureUrl}
                                                    alt={user.firstName || "User"}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                    isDark ? "bg-white/10" : "bg-slate-100"
                                                }`}>
                                                    <UserIcon className={`w-6 h-6 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                                                </div>
                                            )}
                                            {/* Online Status (Mock) */}
                                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-dark-800" />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                                                    {user.firstName} {user.lastName}
                                                </h3>
                                                {/* Verification Badge (Mock logic needed if not in User type) */}
                                                <Shield className="w-4 h-4 text-blue-500" />
                                            </div>
                                            
                                            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                                                <MapPin className="w-3 h-3" />
                                                <span>New York, NY</span> {/* Mock Location */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags/Interests */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["Quiet", "Pet-friendly", "Student"].map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-2 py-1 rounded-md text-xs font-medium ${
                                                    isDark
                                                        ? "bg-white/5 text-slate-400"
                                                        : "bg-slate-100 text-slate-600"
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => router.push(`/messages?userId=${user.id}`)}
                                        className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            isDark
                                                ? "bg-white/10 text-white hover:bg-white/20"
                                                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                        }`}
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Message
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                isDark ? "bg-white/5" : "bg-slate-100"
                            }`}>
                                <Search className={`w-8 h-8 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                            </div>
                            <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                                {hasSearched ? "No roommates found" : "Find your perfect roommate"}
                            </h3>
                            <p className={`text-sm max-w-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                {hasSearched
                                    ? "Try adjusting your search terms or filters to find more results."
                                    : "Enter a location, name, or keyword to start searching for potential roommates."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
