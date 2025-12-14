"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    MapPin,
    Filter,
    Home,
    DollarSign,
    BedDouble,
    Bath,
    Maximize,
    Heart
} from "lucide-react";

// Mock Data Types
interface Property {
    id: number;
    title: string;
    location: string;
    price: number;
    image: string;
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    isSaved: boolean;
}

// Mock Data
const MOCK_PROPERTIES: Property[] = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        location: "Downtown, New York",
        price: 2500,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        beds: 2,
        baths: 2,
        sqft: 1200,
        type: "Apartment",
        isSaved: false
    },
    {
        id: 2,
        title: "Cozy Studio Near Park",
        location: "Brooklyn, New York",
        price: 1800,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        beds: 1,
        baths: 1,
        sqft: 600,
        type: "Studio",
        isSaved: true
    },
    {
        id: 3,
        title: "Luxury Loft with City View",
        location: "Manhattan, New York",
        price: 4500,
        image: "https://images.unsplash.com/photo-1502005229766-93976863d08dd?auto=format&fit=crop&w=800&q=80",
        beds: 3,
        baths: 2.5,
        sqft: 2000,
        type: "Loft",
        isSaved: false
    },
     {
        id: 4,
        title: "Sunny Bedroom in Shared House",
        location: "Queens, New York",
        price: 1200,
        image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        beds: 1,
        baths: 1,
        sqft: 150,
        type: "Room",
        isSaved: false
    },
    {
        id: 5,
        title: "Spacious Suburban Home",
        location: "Staten Island, New York",
        price: 3200,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        beds: 4,
        baths: 3,
        sqft: 2500,
        type: "House",
        isSaved: true
    },
    {
        id: 6,
        title: "Modern Loft in Chelsea",
        location: "Chelsea, New York",
        price: 3800,
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        beds: 2,
        baths: 2,
        sqft: 1100,
        type: "Loft",
        isSaved: false
    },
    {
        id: 7,
        title: "Cozy Bedroom in Shared Apartment",
        location: "East Village, New York",
        price: 1400,
        image: "https://images.unsplash.com/photo-1522050212171-61b01dd24579?auto=format&fit=crop&w=800&q=80",
        beds: 1,
        baths: 1,
        sqft: 180,
        type: "Room",
        isSaved: false
    },
    {
        id: 8,
        title: "Luxury Condo with River View",
        location: "Long Island City, New York",
        price: 3100,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        beds: 2,
        baths: 2,
        sqft: 950,
        type: "Apartment",
        isSaved: true
    },
    {
        id: 9,
        title: "Renovated Brownstone Garden Unit",
        location: "Park Slope, Brooklyn",
        price: 2900,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        beds: 2,
        baths: 1,
        sqft: 900,
        type: "Apartment",
        isSaved: false
    },
    {
        id: 10,
        title: "Affordable Studio in Astoria",
        location: "Astoria, Queens",
        price: 1650,
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
        beds: 1,
        baths: 1,
        sqft: 450,
        type: "Studio",
        isSaved: false
    }
];

export default function SearchRentalsPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { isDark } = useTheme();

    const [searchQuery, setSearchQuery] = useState("");
    const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);

    // Initial check
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [authLoading, isAuthenticated, router]);

    // Handle Search (Mock filtering)
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setProperties(MOCK_PROPERTIES);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = MOCK_PROPERTIES.filter(p => 
                p.title.toLowerCase().includes(lowerQuery) || 
                p.location.toLowerCase().includes(lowerQuery) ||
                p.type.toLowerCase().includes(lowerQuery)
            );
            setProperties(filtered);
        }
    }, [searchQuery]);

    const handleToggleSave = (id: number) => {
        setProperties(prev => prev.map(p => 
            p.id === id ? { ...p, isSaved: !p.isSaved } : p
        ));
    };

    if (authLoading) {
        return null; // Or loading spinner
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
                                    Search Rentals
                                </h1>
                                <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                    Find your next home from verified listings
                                </p>
                            </div>
                        </div>

                         {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="City, neighborhood, or address..."
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
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                         <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                isDark
                                    ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }`}
                        >
                            Price Range
                        </button>
                        <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                isDark
                                    ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }`}
                        >
                            Property Type
                        </button>
                        <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                isDark
                                    ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }`}
                        >
                            Bedrooms / Bathrooms
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className={`flex-1 overflow-y-auto p-4 ${isDark ? "bg-dark-900/20" : "bg-slate-50/50"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {properties.map((property) => (
                            <div
                                key={property.id}
                                className={`group rounded-xl overflow-hidden border transition-all ${
                                    isDark
                                        ? "bg-dark-800/50 border-white/10 hover:border-white/20"
                                        : "bg-white border-slate-200 hover:border-primary-200 hover:shadow-lg"
                                }`}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleToggleSave(property.id);
                                        }}
                                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                                            property.isSaved
                                                ? "bg-red-500 text-white"
                                                : "bg-black/30 text-white hover:bg-black/50"
                                        }`}
                                    >
                                        <Heart className={`w-4 h-4 ${property.isSaved ? "fill-current" : ""}`} />
                                    </button>
                                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                                        ${property.price}/mo
                                    </div>
                                </div>

                                {/* Content */}
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
                                </div>
                            </div>
                        ))}
                    </div>

                    {properties.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                isDark ? "bg-white/5" : "bg-slate-100"
                            }`}>
                                <Search className={`w-8 h-8 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                            </div>
                            <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                                No rentals found
                            </h3>
                            <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                We couldn't find any properties matching your search.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
