"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Heart,
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    User,
    Shield,
    MessageSquare,
    Trash2,
    Home,
    Users,
    DollarSign
} from "lucide-react";

// Mock Data Types
type SavedType = "all" | "rentals" | "roommates";

interface SavedProperty {
    id: number;
    type: "rental";
    title: string;
    location: string;
    price: number;
    image: string;
    beds: number;
    baths: number;
    sqft: number;
    dateSaved: string;
}

interface SavedRoommate {
    id: number;
    type: "roommate";
    name: string;
    location: string;
    budget: number;
    image: string;
    matchScore: number;
    dateSaved: string;
}

// Mock Data
const MOCK_SAVED_PROPERTIES: SavedProperty[] = [
    {
        id: 2,
        type: "rental",
        title: "Cozy Studio Near Park",
        location: "Brooklyn, New York",
        price: 1800,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        beds: 1,
        baths: 1,
        sqft: 600,
        dateSaved: "2 days ago"
    },
    {
        id: 5,
        type: "rental",
        title: "Spacious Suburban Home",
        location: "Staten Island, New York",
        price: 3200,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        beds: 4,
        baths: 3,
        sqft: 2500,
        dateSaved: "1 week ago"
    }
];

const MOCK_SAVED_ROOMMATES: SavedRoommate[] = [
    {
        id: 101,
        type: "roommate",
        name: "Sarah Jenkins",
        location: "Lower East Side, NY",
        budget: 1500,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
        matchScore: 95,
        dateSaved: "3 days ago"
    },
    {
        id: 102,
        type: "roommate",
        name: "Michael Chen",
        location: "Astoria, Queens",
        budget: 1300,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        matchScore: 88,
        dateSaved: "5 days ago"
    }
];

export default function SavedPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { isDark } = useTheme();

    const [activeTab, setActiveTab] = useState<SavedType>("all");
    const [savedProperties, setSavedProperties] = useState(MOCK_SAVED_PROPERTIES);
    const [savedRoommates, setSavedRoommates] = useState(MOCK_SAVED_ROOMMATES);

    // Initial check
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [authLoading, isAuthenticated, router]);

    const handleRemove = (id: number, type: "rental" | "roommate") => {
        if (type === "rental") {
            setSavedProperties(prev => prev.filter(p => p.id !== id));
        } else {
            setSavedRoommates(prev => prev.filter(r => r.id !== id));
        }
    };

    if (authLoading) {
        return null;
    }

    const showRentals = activeTab === "all" || activeTab === "rentals";
    const showRoommates = activeTab === "all" || activeTab === "roommates";

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
                                    Saved Items
                                </h1>
                                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    Your collections of properties and potential roommates
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-4 pb-0 flex items-center gap-6">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
                                activeTab === "all"
                                    ? isDark
                                        ? "border-primary-500 text-primary-400"
                                        : "border-primary-600 text-primary-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                        >
                            All Saved
                        </button>
                        <button
                             onClick={() => setActiveTab("rentals")}
                            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
                                activeTab === "rentals"
                                    ? isDark
                                        ? "border-primary-500 text-primary-400"
                                        : "border-primary-600 text-primary-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                        >
                            Properties ({savedProperties.length})
                        </button>
                        <button
                             onClick={() => setActiveTab("roommates")}
                            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
                                activeTab === "roommates"
                                    ? isDark
                                        ? "border-primary-500 text-primary-400"
                                        : "border-primary-600 text-primary-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            }`}
                        >
                            Roommates ({savedRoommates.length})
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className={`flex-1 overflow-y-auto p-6 ${isDark ? "bg-dark-900/20" : "bg-slate-50/50"}`}>
                    <div className="space-y-8">
                        
                        {/* Rentals Section */}
                        {showRentals && savedProperties.length > 0 && (
                            <div>
                                <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                                    isDark ? "text-slate-500" : "text-slate-400"
                                }`}>
                                    Saved Properties
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {savedProperties.map((property) => (
                                        <div
                                            key={property.id}
                                            className={`relative group rounded-xl overflow-hidden border transition-all ${
                                                isDark
                                                    ? "bg-dark-800/50 border-white/10 hover:border-white/20"
                                                    : "bg-white border-slate-200 hover:border-primary-200 hover:shadow-lg"
                                            }`}
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={property.image}
                                                    alt={property.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <button
                                                    onClick={() => handleRemove(property.id, "rental")}
                                                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remove from saved"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                                                    ${property.price}/mo
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <h3 className={`font-semibold truncate mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                                                    {property.title}
                                                </h3>
                                                <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                                                    <MapPin className="w-3 h-3" />
                                                    <span className="truncate">{property.location}</span>
                                                </div>

                                                <div className={`flex items-center justify-between text-xs ${
                                                    isDark ? "text-slate-400" : "text-slate-500"
                                                }`}>
                                                    <div className="flex items-center gap-1">
                                                        <BedDouble className="w-3 h-3" />
                                                        <span>{property.beds} Bed</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Bath className="w-3 h-3" />
                                                        <span>{property.baths} Bath</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Maximize className="w-3 h-3" />
                                                        <span>{property.sqft} sqft</span>
                                                    </div>
                                                </div>
                                                <div className={`mt-3 pt-3 border-t text-xs flex justify-between ${
                                                    isDark ? "border-white/5 text-slate-500" : "border-slate-100 text-slate-400"
                                                }`}>
                                                    <span>Saved {property.dateSaved}</span>
                                                    <button className="text-primary-500 hover:underline">View Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Roommates Section */}
                        {showRoommates && savedRoommates.length > 0 && (
                            <div>
                                <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                                    isDark ? "text-slate-500" : "text-slate-400"
                                }`}>
                                    Saved Roommates
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {savedRoommates.map((user) => (
                                        <div
                                            key={user.id}
                                            className={`p-4 rounded-xl border transition-all ${
                                                isDark
                                                    ? "bg-dark-800/50 border-white/10 hover:border-white/20"
                                                    : "bg-white border-slate-200 hover:border-primary-200 hover:shadow-sm"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={user.image}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className={`font-semibold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                                                            {user.name}
                                                        </h3>
                                                        <span className="text-xs font-semibold text-green-500">
                                                            {user.matchScore}% Match
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{user.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                                                        <DollarSign className="w-3 h-3" />
                                                        <span>Budget: ${user.budget}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={() => router.push(`/messages?userId=${user.id}`)}
                                                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                        isDark
                                                            ? "bg-white/10 text-white hover:bg-white/20"
                                                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                    Message
                                                </button>
                                                <button
                                                    onClick={() => handleRemove(user.id, "roommate")}
                                                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                                                        isDark
                                                            ? "bg-white/5 text-slate-400 hover:bg-red-500/20 hover:text-red-400"
                                                            : "bg-slate-50 text-slate-500 hover:bg-red-100 hover:text-red-600"
                                                    }`}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty States */}
                        {((showRentals && savedProperties.length === 0) || (showRoommates && savedRoommates.length === 0)) && (
                             <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                    isDark ? "bg-white/5" : "bg-slate-100"
                                }`}>
                                    <Heart className={`w-8 h-8 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                                </div>
                                <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                                    No saved items yet
                                </h3>
                                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    Start browsing rentals or roommates to save your favorites here.
                                </p>
                                <button
                                    onClick={() => router.push("/search")}
                                    className="mt-4 px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                                >
                                    Browse Rentals
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
