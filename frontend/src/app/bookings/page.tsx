"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Loader2, Calendar, CheckCircle, XCircle, Clock, MapPin } from "lucide-react";
import apiClient from "@/lib/api";

type Booking = {
    id: number;
    tenantId: number;
    tenantName: string;
    landlordId: number;
    landlordName: string;
    startDate: string;
    endDate: string;
    status: "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED" | "COMPLETED";
    notes: string;
    createdAt: string;
};

export default function BookingsPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState<"requests" | "my-bookings">("my-bookings");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [authLoading, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBookings();
        }
    }, [isAuthenticated, activeTab]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === "requests" ? "/bookings/requests" : "/bookings/my-bookings";
            const response = await apiClient.get(endpoint);
            const data = response.data.content ? response.data.content : response.data;
            setBookings(data);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            await apiClient.patch(`/bookings/${id}/status`, null, {
                params: { status }
            });
            fetchBookings();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "CONFIRMED": return "text-green-500 bg-green-500/10";
            case "REJECTED": return "text-red-500 bg-red-500/10";
            case "CANCELLED": return "text-slate-500 bg-slate-500/10";
            case "COMPLETED": return "text-blue-500 bg-blue-500/10";
            default: return "text-yellow-500 bg-yellow-500/10";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "CONFIRMED": return <CheckCircle className="w-4 h-4" />;
            case "REJECTED": return <XCircle className="w-4 h-4" />;
            case "PENDING": return <Clock className="w-4 h-4" />;
            default: return <Calendar className="w-4 h-4" />;
        }
    };

    if (authLoading) return null;

    return (
        <DashboardLayout>
            <div className={`h-[calc(100vh-120px)] flex flex-col rounded-xl overflow-hidden border ${
                isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"
            }`}>
                {/* Header */}
                <div className={`p-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                    <h1 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                        Bookings
                    </h1>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Track your upcoming stays and rental requests
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => setActiveTab("my-bookings")}
                            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "my-bookings"
                                    ? `border-primary-500 ${isDark ? "text-primary-400" : "text-primary-600"}`
                                    : `border-transparent ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`
                            }`}
                        >
                            My Bookings
                        </button>
                        <button
                            onClick={() => setActiveTab("requests")}
                            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "requests"
                                    ? `border-primary-500 ${isDark ? "text-primary-400" : "text-primary-600"}`
                                    : `border-transparent ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`
                            }`}
                        >
                            Requests
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className={`w-8 h-8 animate-spin ${isDark ? "text-primary-400" : "text-primary-600"}`} />
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <Calendar className={`w-12 h-12 mb-4 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
                            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
                                No bookings found
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ${
                                        isDark ? "bg-dark-900/50 border-white/10" : "bg-white border-slate-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            isDark ? "bg-white/10" : "bg-slate-100"
                                        }`}>
                                            <Calendar className={`w-6 h-6 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                                                {activeTab === "my-bookings" 
                                                    ? `Booking with ${booking.landlordName}`
                                                    : `Request from ${booking.tenantName}`
                                                }
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                 <span>{booking.startDate} - {booking.endDate}</span>
                                            </div>
                                            {booking.notes && (
                                                <p className="text-xs text-slate-400 mt-1 italic">
                                                    "{booking.notes}"
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 self-end sm:self-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(booking.status)}`}>
                                            {getStatusIcon(booking.status)}
                                            {booking.status}
                                        </span>

                                        {booking.status === "PENDING" && activeTab === "requests" && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(booking.id, "CONFIRMED")}
                                                    className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-xs font-medium hover:bg-primary-700 transition-colors"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(booking.id, "REJECTED")}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                        isDark 
                                                            ? "bg-white/10 text-slate-300 hover:bg-white/20" 
                                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        
                                        {booking.status === "PENDING" && activeTab === "my-bookings" && (
                                            <button
                                                onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                    isDark 
                                                        ? "bg-white/10 text-slate-300 hover:bg-white/20" 
                                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                }`}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
