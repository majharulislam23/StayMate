"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Loader2, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import apiClient from "@/lib/api";

type Application = {
    id: number;
    senderId: number;
    senderName: string;
    senderProfilePictureUrl?: string;
    receiverId: number;
    receiverName: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
    message: string;
    createdAt: string;
};

export default function ApplicationsPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { isDark } = useTheme();
    const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [authLoading, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchApplications();
        }
    }, [isAuthenticated, activeTab]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === "received" ? "/applications/received" : "/applications/sent";
            const response = await apiClient.get(endpoint);
            // Handling Page response or List response
            const data = response.data.content ? response.data.content : response.data;
            setApplications(data);
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: number, status: string) => {
        try {
            await apiClient.patch(`/applications/${id}/status`, null, {
                params: { status }
            });
            fetchApplications(); // Refresh list
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACCEPTED": return "text-green-500 bg-green-500/10";
            case "REJECTED": return "text-red-500 bg-red-500/10";
            case "CANCELLED": return "text-slate-500 bg-slate-500/10";
            default: return "text-yellow-500 bg-yellow-500/10";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "ACCEPTED": return <CheckCircle className="w-4 h-4" />;
            case "REJECTED": return <XCircle className="w-4 h-4" />;
            case "PENDING": return <Clock className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    if (authLoading) return null; // Or a full page loader

    return (
        <DashboardLayout>
            <div className={`h-[calc(100vh-120px)] flex flex-col rounded-xl overflow-hidden border ${
                isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"
            }`}>
                {/* Header */}
                <div className={`p-4 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                    <h1 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                        Applications
                    </h1>
                    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        Manage your roommate applications
                    </p>

                    {/* Tabs */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => setActiveTab("received")}
                            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "received"
                                    ? `border-primary-500 ${isDark ? "text-primary-400" : "text-primary-600"}`
                                    : `border-transparent ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`
                            }`}
                        >
                            Received ({activeTab === 'received' ? applications.length : '...'})
                        </button>
                        <button
                            onClick={() => setActiveTab("sent")}
                            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "sent"
                                    ? `border-primary-500 ${isDark ? "text-primary-400" : "text-primary-600"}`
                                    : `border-transparent ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`
                            }`}
                        >
                            Sent
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className={`w-8 h-8 animate-spin ${isDark ? "text-primary-400" : "text-primary-600"}`} />
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <FileText className={`w-12 h-12 mb-4 ${isDark ? "text-slate-600" : "text-slate-300"}`} />
                            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
                                No applications found
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {applications.map((app) => (
                                <div
                                    key={app.id}
                                    className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ${
                                        isDark ? "bg-dark-900/50 border-white/10" : "bg-white border-slate-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            isDark ? "bg-white/10" : "bg-slate-100"
                                        }`}>
                                            <FileText className={`w-6 h-6 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                                                {activeTab === "received" ? app.senderName : app.receiverName}
                                            </h3>
                                            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                                {app.message || "No message provided"}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 self-end sm:self-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(app.status)}`}>
                                            {getStatusIcon(app.status)}
                                            {app.status}
                                        </span>

                                        {app.status === "PENDING" && activeTab === "received" && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(app.id, "ACCEPTED")}
                                                    className="px-3 py-1.5 rounded-lg bg-primary-600 text-white text-xs font-medium hover:bg-primary-700 transition-colors"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(app.id, "REJECTED")}
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
                                        
                                        {app.status === "PENDING" && activeTab === "sent" && (
                                              <button
                                                  onClick={() => handleStatusUpdate(app.id, "CANCELLED")}
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
