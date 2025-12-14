"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Building,
    Users,
    Search,
    Plus,
    BarChart3,
    TrendingUp,
    TrendingDown,
    Eye,
    Heart,
    MessageSquare,
    Calendar,
    MapPin,
    ArrowRight,
    Star,
    Clock,
    CheckCircle,
    AlertCircle,
    Home,
    Key,
    Shield,
    FileText,
    Wallet,
    Bell,
    DollarSign,
    Target,
    Lightbulb,
    BookOpen,
    Map,
    Calculator,
    Briefcase,
    Award,
    Zap,
    PieChart,
    Activity,
    Lock,
    UserCheck,
    Wrench,
    ClipboardList,
    TrendingDown as TrendDown,
    Phone,
    Mail,
    Globe,
    Settings,
    HelpCircle,
    ChevronRight,
    Sparkles,
    Coffee,
    Compass,
    Bookmark,
    Share2,
    ThumbsUp,
    AlertTriangle,
    Info,
    ArrowUpRight,
    LayoutGrid,
    List,
    Filter,
} from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();
    const {
        user,
        isAuthenticated,
        isLoading,
        isAdmin,
        isHouseOwner,
        isRegularUser,
        needsRoleSelection,
    } = useAuth();
    const { isDark } = useTheme();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        } else if (!isLoading && isAuthenticated && needsRoleSelection) {
            router.push("/select-role");
        }
    }, [isAuthenticated, isLoading, needsRoleSelection, router]);

    if (isLoading) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${isDark ? "bg-dark-950" : "bg-slate-50"}`}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    <p
                        className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <DashboardLayout>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1
                    className={`text-2xl sm:text-3xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                >
                    {getGreeting()},{" "}
                    {user.firstName || user.email?.split("@")[0]}! 👋
                </h1>
                <p
                    className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                    {isAdmin && "Here's an overview of your platform."}
                    {isHouseOwner &&
                        "Here's what's happening with your properties."}
                    {isRegularUser &&
                        "Find your perfect rental or roommate today."}
                </p>
            </div>

            {isAdmin && <AdminDashboard isDark={isDark} />}
            {isHouseOwner && <HouseOwnerDashboard isDark={isDark} />}
            {isRegularUser && <UserDashboard isDark={isDark} user={user} />}
        </DashboardLayout>
    );
}

// ============================================
// ADMIN DASHBOARD
// ============================================
function AdminDashboard({ isDark }: { isDark: boolean }) {
    const stats = [
        {
            label: "Total Users",
            value: "12,847",
            change: "+12.5%",
            trend: "up",
            icon: <Users className="w-5 h-5" />,
            color: "blue",
        },
        {
            label: "Active Listings",
            value: "3,429",
            change: "+8.2%",
            trend: "up",
            icon: <Building className="w-5 h-5" />,
            color: "emerald",
        },
        {
            label: "Monthly Revenue",
            value: "$48,250",
            change: "+23.1%",
            trend: "up",
            icon: <DollarSign className="w-5 h-5" />,
            color: "purple",
        },
        {
            label: "Pending Verifications",
            value: "156",
            change: "-5.3%",
            trend: "down",
            icon: <Shield className="w-5 h-5" />,
            color: "amber",
        },
    ];

    const colorClasses: Record<
        string,
        { bg: string; text: string; border: string }
    > = {
        blue: {
            bg: isDark ? "bg-blue-500/10" : "bg-blue-50",
            text: isDark ? "text-blue-400" : "text-blue-600",
            border: isDark ? "border-blue-500/20" : "border-blue-200",
        },
        emerald: {
            bg: isDark ? "bg-emerald-500/10" : "bg-emerald-50",
            text: isDark ? "text-emerald-400" : "text-emerald-600",
            border: isDark ? "border-emerald-500/20" : "border-emerald-200",
        },
        purple: {
            bg: isDark ? "bg-purple-500/10" : "bg-purple-50",
            text: isDark ? "text-purple-400" : "text-purple-600",
            border: isDark ? "border-purple-500/20" : "border-purple-200",
        },
        amber: {
            bg: isDark ? "bg-amber-500/10" : "bg-amber-50",
            text: isDark ? "text-amber-400" : "text-amber-600",
            border: isDark ? "border-amber-500/20" : "border-amber-200",
        },
        rose: {
            bg: isDark ? "bg-rose-500/10" : "bg-rose-50",
            text: isDark ? "text-rose-400" : "text-rose-600",
            border: isDark ? "border-rose-500/20" : "border-rose-200",
        },
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                    const colors = colorClasses[stat.color];
                    return (
                        <div
                            key={idx}
                            className={`p-5 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"} hover:shadow-lg transition-all`}
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}
                                >
                                    {stat.icon}
                                </div>
                                <span
                                    className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                        stat.trend === "up"
                                            ? isDark
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-emerald-50 text-emerald-600"
                                            : isDark
                                              ? "bg-rose-500/10 text-rose-400"
                                              : "bg-rose-50 text-rose-600"
                                    }`}
                                >
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    {stat.change}
                                </span>
                            </div>
                            <p
                                className={`mt-4 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                            >
                                {stat.value}
                            </p>
                            <p
                                className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                            >
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions for Admin */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <QuickAction
                    isDark={isDark}
                    icon={<UserCheck className="w-5 h-5" />}
                    title="Verify Users"
                    description="156 pending requests"
                    href="/admin/verifications"
                    color="amber"
                    badge="156"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<Shield className="w-5 h-5" />}
                    title="Moderate Listings"
                    description="Review flagged content"
                    href="/admin/moderation"
                    color="rose"
                    badge="23"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="View Analytics"
                    description="Platform performance"
                    href="/admin/analytics"
                    color="blue"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<Settings className="w-5 h-5" />}
                    title="Settings"
                    description="Configure platform"
                    href="/admin/settings"
                    color="purple"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth Chart */}
                <div
                    className={`lg:col-span-2 p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3
                                className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                            >
                                Platform Growth
                            </h3>
                            <p
                                className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                            >
                                User registrations over time
                            </p>
                        </div>
                        <select
                            className={`px-3 py-1.5 text-sm rounded-lg border ${
                                isDark
                                    ? "bg-dark-700 border-white/10 text-white"
                                    : "bg-white border-slate-200 text-slate-700"
                            }`}
                        >
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                    {/* Simplified Chart Visualization */}
                    <div className="h-64 flex items-end gap-2">
                        {[40, 65, 45, 80, 55, 90, 75, 95, 70, 85, 100, 88].map(
                            (height, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 flex flex-col items-center gap-2"
                                >
                                    <div
                                        className={`w-full rounded-t-lg transition-all ${
                                            isDark
                                                ? "bg-primary-500/80"
                                                : "bg-primary-500"
                                        }`}
                                        style={{ height: `${height}%` }}
                                    />
                                    <span
                                        className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                                    >
                                        {idx + 1}
                                    </span>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* System Health */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <h3
                        className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                        System Health
                    </h3>
                    <div className="space-y-4">
                        {[
                            {
                                name: "API Response",
                                value: 98,
                                status: "healthy",
                            },
                            { name: "Database", value: 95, status: "healthy" },
                            { name: "Storage", value: 72, status: "warning" },
                            {
                                name: "Email Service",
                                value: 100,
                                status: "healthy",
                            },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex items-center justify-between mb-1">
                                    <span
                                        className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
                                    >
                                        {item.name}
                                    </span>
                                    <span
                                        className={`text-xs font-medium ${
                                            item.status === "healthy"
                                                ? isDark
                                                    ? "text-emerald-400"
                                                    : "text-emerald-600"
                                                : isDark
                                                  ? "text-amber-400"
                                                  : "text-amber-600"
                                        }`}
                                    >
                                        {item.value}%
                                    </span>
                                </div>
                                <div
                                    className={`h-2 rounded-full ${isDark ? "bg-white/10" : "bg-slate-100"}`}
                                >
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            item.status === "healthy"
                                                ? "bg-emerald-500"
                                                : "bg-amber-500"
                                        }`}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className={`mt-4 p-3 rounded-lg ${isDark ? "bg-emerald-500/10" : "bg-emerald-50"}`}
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle
                                className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                            />
                            <span
                                className={`text-sm font-medium ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
                            >
                                All systems operational
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activities & User Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Admin Activities */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Recent Activity
                        </h3>
                        <Link
                            href="/admin/activity"
                            className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                action: "New user verified",
                                user: "John Smith",
                                time: "2 min ago",
                                type: "success",
                            },
                            {
                                action: "Listing flagged",
                                user: "Property #4521",
                                time: "15 min ago",
                                type: "warning",
                            },
                            {
                                action: "Payment received",
                                user: "$299 subscription",
                                time: "1 hour ago",
                                type: "info",
                            },
                            {
                                action: "Support ticket resolved",
                                user: "Ticket #1892",
                                time: "3 hours ago",
                                type: "success",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? "hover:bg-white/5" : "hover:bg-slate-50"} transition-colors`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        item.type === "success"
                                            ? "bg-emerald-500"
                                            : item.type === "warning"
                                              ? "bg-amber-500"
                                              : "bg-blue-500"
                                    }`}
                                />
                                <div className="flex-1">
                                    <p
                                        className={`text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                    >
                                        {item.action}
                                    </p>
                                    <p
                                        className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                    >
                                        {item.user}
                                    </p>
                                </div>
                                <span
                                    className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                                >
                                    {item.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Distribution */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <h3
                        className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                        User Distribution
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                            {
                                label: "Renters",
                                value: "8,542",
                                percent: 66,
                                color: "blue",
                            },
                            {
                                label: "Landlords",
                                value: "3,128",
                                percent: 24,
                                color: "emerald",
                            },
                            {
                                label: "Verified",
                                value: "9,847",
                                percent: 77,
                                color: "purple",
                            },
                            {
                                label: "Premium",
                                value: "1,234",
                                percent: 10,
                                color: "amber",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}
                            >
                                <p
                                    className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                                >
                                    {item.value}
                                </p>
                                <p
                                    className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                >
                                    {item.label}
                                </p>
                                <div
                                    className={`mt-2 h-1.5 rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                                >
                                    <div
                                        className={`h-full rounded-full ${
                                            item.color === "blue"
                                                ? "bg-blue-500"
                                                : item.color === "emerald"
                                                  ? "bg-emerald-500"
                                                  : item.color === "purple"
                                                    ? "bg-purple-500"
                                                    : "bg-amber-500"
                                        }`}
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue Overview */}
            <div
                className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Revenue Overview
                        </h3>
                        <p
                            className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                        >
                            Monthly revenue breakdown
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Subscriptions",
                            value: "$32,450",
                            icon: <Award className="w-5 h-5" />,
                            change: "+18%",
                        },
                        {
                            label: "Listing Fees",
                            value: "$8,920",
                            icon: <Building className="w-5 h-5" />,
                            change: "+12%",
                        },
                        {
                            label: "Premium Features",
                            value: "$4,280",
                            icon: <Sparkles className="w-5 h-5" />,
                            change: "+25%",
                        },
                        {
                            label: "Commissions",
                            value: "$2,600",
                            icon: <PieChart className="w-5 h-5" />,
                            change: "+8%",
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span
                                    className={`p-2 rounded-lg ${isDark ? "bg-primary-500/20 text-primary-400" : "bg-primary-50 text-primary-600"}`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}
                                >
                                    {item.change}
                                </span>
                            </div>
                            <p
                                className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                            >
                                {item.value}
                            </p>
                            <p
                                className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                            >
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// HOUSE OWNER DASHBOARD
// ============================================
function HouseOwnerDashboard({ isDark }: { isDark: boolean }) {
    const stats = [
        {
            label: "Total Properties",
            value: "8",
            icon: <Building className="w-5 h-5" />,
            color: "blue",
        },
        {
            label: "Monthly Revenue",
            value: "$12,450",
            change: "+15.3%",
            trend: "up",
            icon: <DollarSign className="w-5 h-5" />,
            color: "emerald",
        },
        {
            label: "Total Views",
            value: "2,847",
            change: "+28.4%",
            trend: "up",
            icon: <Eye className="w-5 h-5" />,
            color: "purple",
        },
        {
            label: "Inquiries",
            value: "34",
            change: "+12.1%",
            trend: "up",
            icon: <MessageSquare className="w-5 h-5" />,
            color: "amber",
        },
    ];

    const properties = [
        {
            name: "Modern 2BR Apartment",
            location: "Manhattan, NYC",
            price: "$2,500/mo",
            views: 542,
            inquiries: 12,
            status: "Active",
            occupancy: 100,
        },
        {
            name: "Cozy Studio Downtown",
            location: "Brooklyn, NYC",
            price: "$1,800/mo",
            views: 328,
            inquiries: 8,
            status: "Active",
            occupancy: 100,
        },
        {
            name: "Spacious 3BR House",
            location: "Queens, NYC",
            price: "$3,200/mo",
            views: 215,
            inquiries: 5,
            status: "Pending",
            occupancy: 0,
        },
    ];

    const colorClasses: Record<string, { bg: string; text: string }> = {
        blue: {
            bg: isDark ? "bg-blue-500/10" : "bg-blue-50",
            text: isDark ? "text-blue-400" : "text-blue-600",
        },
        emerald: {
            bg: isDark ? "bg-emerald-500/10" : "bg-emerald-50",
            text: isDark ? "text-emerald-400" : "text-emerald-600",
        },
        purple: {
            bg: isDark ? "bg-purple-500/10" : "bg-purple-50",
            text: isDark ? "text-purple-400" : "text-purple-600",
        },
        amber: {
            bg: isDark ? "bg-amber-500/10" : "bg-amber-50",
            text: isDark ? "text-amber-400" : "text-amber-600",
        },
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                    const colors = colorClasses[stat.color];
                    return (
                        <div
                            key={idx}
                            className={`p-5 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"} hover:shadow-lg transition-all`}
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`p-2.5 rounded-xl ${colors.bg} ${colors.text}`}
                                >
                                    {stat.icon}
                                </div>
                                {stat.change && (
                                    <span
                                        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                            stat.trend === "up"
                                                ? isDark
                                                    ? "bg-emerald-500/10 text-emerald-400"
                                                    : "bg-emerald-50 text-emerald-600"
                                                : isDark
                                                  ? "bg-rose-500/10 text-rose-400"
                                                  : "bg-rose-50 text-rose-600"
                                        }`}
                                    >
                                        {stat.trend === "up" ? (
                                            <TrendingUp className="w-3 h-3" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3" />
                                        )}
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                            <p
                                className={`mt-4 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                            >
                                {stat.value}
                            </p>
                            <p
                                className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                            >
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <QuickAction
                    isDark={isDark}
                    icon={<Plus className="w-5 h-5" />}
                    title="Add Property"
                    description="List a new rental"
                    href="/properties/new"
                    color="emerald"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<MessageSquare className="w-5 h-5" />}
                    title="Messages"
                    description="12 unread messages"
                    href="/messages"
                    color="blue"
                    badge="12"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<Calendar className="w-5 h-5" />}
                    title="Viewings"
                    description="3 scheduled today"
                    href="/viewings"
                    color="purple"
                    badge="3"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<Wallet className="w-5 h-5" />}
                    title="Payments"
                    description="View transactions"
                    href="/payments"
                    color="amber"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Properties Overview */}
                <div
                    className={`lg:col-span-2 p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Your Properties
                        </h3>
                        <Link
                            href="/properties"
                            className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {properties.map((property, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-50 hover:bg-slate-100"} transition-colors cursor-pointer`}
                            >
                                <div
                                    className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                                >
                                    <Home
                                        className={`w-7 h-7 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p
                                            className={`font-semibold truncate ${isDark ? "text-white" : "text-slate-900"}`}
                                        >
                                            {property.name}
                                        </p>
                                        <span
                                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                property.status === "Active"
                                                    ? isDark
                                                        ? "bg-emerald-500/20 text-emerald-400"
                                                        : "bg-emerald-100 text-emerald-700"
                                                    : isDark
                                                      ? "bg-amber-500/20 text-amber-400"
                                                      : "bg-amber-100 text-amber-700"
                                            }`}
                                        >
                                            {property.status}
                                        </span>
                                    </div>
                                    <p
                                        className={`text-sm flex items-center gap-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                    >
                                        <MapPin className="w-3 h-3" />
                                        {property.location}
                                    </p>
                                    <div
                                        className={`flex items-center gap-4 mt-1 text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                    >
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {property.views} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="w-3 h-3" />
                                            {property.inquiries} inquiries
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`font-bold ${isDark ? "text-primary-400" : "text-primary-600"}`}
                                    >
                                        {property.price}
                                    </p>
                                    <div className="mt-1">
                                        <div
                                            className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                        >
                                            Occupancy
                                        </div>
                                        <div
                                            className={`w-16 h-1.5 rounded-full mt-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                                        >
                                            <div
                                                className={`h-full rounded-full ${property.occupancy === 100 ? "bg-emerald-500" : "bg-amber-500"}`}
                                                style={{
                                                    width: `${property.occupancy}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Income Summary */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <h3
                        className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                        Income Summary
                    </h3>
                    <div
                        className={`p-4 rounded-xl mb-4 ${isDark ? "bg-gradient-to-br from-emerald-500/20 to-blue-500/20" : "bg-gradient-to-br from-emerald-50 to-blue-50"}`}
                    >
                        <p
                            className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
                        >
                            This Month
                        </p>
                        <p
                            className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            $12,450
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                            <TrendingUp
                                className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                            />
                            <span
                                className={`text-sm font-medium ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                            >
                                +15.3% from last month
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                label: "Rent Collected",
                                value: "$10,500",
                                status: "complete",
                            },
                            {
                                label: "Pending",
                                value: "$1,500",
                                status: "pending",
                            },
                            {
                                label: "Overdue",
                                value: "$450",
                                status: "overdue",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            item.status === "complete"
                                                ? "bg-emerald-500"
                                                : item.status === "pending"
                                                  ? "bg-amber-500"
                                                  : "bg-rose-500"
                                        }`}
                                    />
                                    <span
                                        className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                                <span
                                    className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                                >
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Maintenance Requests */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Maintenance Requests
                        </h3>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${isDark ? "bg-rose-500/20 text-rose-400" : "bg-rose-100 text-rose-700"}`}
                        >
                            5 Open
                        </span>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                issue: "Leaky faucet in bathroom",
                                property: "Modern 2BR Apartment",
                                priority: "Medium",
                                time: "2 days ago",
                            },
                            {
                                issue: "AC not cooling properly",
                                property: "Cozy Studio Downtown",
                                priority: "High",
                                time: "1 day ago",
                            },
                            {
                                issue: "Light fixture replacement",
                                property: "Spacious 3BR House",
                                priority: "Low",
                                time: "5 days ago",
                            },
                        ].map((request, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg ${isDark ? "bg-white/5" : "bg-slate-50"}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p
                                            className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                        >
                                            {request.issue}
                                        </p>
                                        <p
                                            className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                        >
                                            {request.property}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            request.priority === "High"
                                                ? isDark
                                                    ? "bg-rose-500/20 text-rose-400"
                                                    : "bg-rose-100 text-rose-700"
                                                : request.priority === "Medium"
                                                  ? isDark
                                                      ? "bg-amber-500/20 text-amber-400"
                                                      : "bg-amber-100 text-amber-700"
                                                  : isDark
                                                    ? "bg-slate-500/20 text-slate-400"
                                                    : "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        {request.priority}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span
                                        className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
                                    >
                                        <Clock className="w-3 h-3 inline mr-1" />
                                        {request.time}
                                    </span>
                                    <button
                                        className={`text-xs font-medium ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Viewings */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Upcoming Viewings
                        </h3>
                        <Link
                            href="/viewings"
                            className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                        >
                            Manage <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                name: "Sarah Johnson",
                                property: "Modern 2BR Apartment",
                                date: "Today",
                                time: "2:00 PM",
                            },
                            {
                                name: "Mike Chen",
                                property: "Cozy Studio Downtown",
                                date: "Today",
                                time: "4:30 PM",
                            },
                            {
                                name: "Emily Davis",
                                property: "Spacious 3BR House",
                                date: "Tomorrow",
                                time: "10:00 AM",
                            },
                        ].map((viewing, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-4 p-3 rounded-lg ${isDark ? "bg-white/5" : "bg-slate-50"}`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-primary-500/20" : "bg-primary-100"}`}
                                >
                                    <span
                                        className={`text-sm font-semibold ${isDark ? "text-primary-400" : "text-primary-600"}`}
                                    >
                                        {viewing.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p
                                        className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                    >
                                        {viewing.name}
                                    </p>
                                    <p
                                        className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                    >
                                        {viewing.property}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                    >
                                        {viewing.date}
                                    </p>
                                    <p
                                        className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                    >
                                        {viewing.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tips for Landlords */}
            <div
                className={`p-6 rounded-xl border ${isDark ? "bg-gradient-to-r from-primary-500/10 to-purple-500/10 border-white/10" : "bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200"}`}
            >
                <div className="flex items-start gap-4">
                    <div
                        className={`p-3 rounded-xl ${isDark ? "bg-primary-500/20" : "bg-primary-100"}`}
                    >
                        <Lightbulb
                            className={`w-6 h-6 ${isDark ? "text-primary-400" : "text-primary-600"}`}
                        />
                    </div>
                    <div className="flex-1">
                        <h4
                            className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Pro Tip: Boost Your Listing Visibility
                        </h4>
                        <p
                            className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                        >
                            Properties with high-quality photos get 3x more
                            inquiries. Consider upgrading your listing photos or
                            adding a virtual tour to attract more potential
                            tenants.
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                            <Link
                                href="/properties/photos"
                                className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                            >
                                Upload Photos <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/help/listing-tips"
                                className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-500"}`}
                            >
                                More Tips
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// USER DASHBOARD
// ============================================
function UserDashboard({ isDark, user }: { isDark: boolean; user: any }) {
    const recommendations = [
        {
            name: "Sunny Studio in Manhattan",
            location: "Manhattan, NYC",
            price: "$1,100/mo",
            rating: 4.8,
            beds: 0,
            baths: 1,
            sqft: 450,
            verified: true,
        },
        {
            name: "Shared 2BR Apartment",
            location: "Brooklyn, NYC",
            price: "$650/mo",
            rating: 4.5,
            beds: 2,
            baths: 1,
            sqft: 850,
            verified: true,
        },
        {
            name: "Cozy Room Near Subway",
            location: "Queens, NYC",
            price: "$550/mo",
            rating: 4.7,
            beds: 1,
            baths: 1,
            sqft: 320,
            verified: false,
        },
    ];

    const roommateMatches = [
        {
            name: "Alex Johnson",
            compatibility: 95,
            interests: ["Music", "Gaming", "Cooking"],
            age: 26,
            occupation: "Software Engineer",
        },
        {
            name: "Sam Williams",
            compatibility: 88,
            interests: ["Reading", "Hiking", "Movies"],
            age: 24,
            occupation: "Graduate Student",
        },
        {
            name: "Jordan Lee",
            compatibility: 82,
            interests: ["Sports", "Travel", "Photography"],
            age: 28,
            occupation: "Marketing Manager",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickAction
                    isDark={isDark}
                    icon={<Search className="w-5 h-5" />}
                    title="Search Rentals"
                    description="Find your perfect home"
                    href="/search"
                    color="blue"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<Users className="w-5 h-5" />}
                    title="Find Roommates"
                    description="Connect with matches"
                    href="/roommates"
                    color="purple"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<Heart className="w-5 h-5" />}
                    title="Saved Listings"
                    description="5 properties saved"
                    href="/saved"
                    color="rose"
                    badge="5"
                />
                <QuickAction
                    isDark={isDark}
                    icon={<MessageSquare className="w-5 h-5" />}
                    title="Messages"
                    description="3 unread messages"
                    href="/messages"
                    color="emerald"
                    badge="3"
                />
            </div>

            {/* Profile Completion Card */}
            {(!user.phoneNumber || !user.bio || !user.city) && (
                <div
                    className={`p-5 rounded-xl border ${
                        isDark
                            ? "bg-amber-500/10 border-amber-500/20"
                            : "bg-amber-50 border-amber-200"
                    }`}
                >
                    <div className="flex items-start gap-4">
                        <div
                            className={`p-2 rounded-lg ${isDark ? "bg-amber-500/20" : "bg-amber-100"}`}
                        >
                            <AlertCircle
                                className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-600"}`}
                            />
                        </div>
                        <div className="flex-1">
                            <h4
                                className={`font-medium ${isDark ? "text-amber-400" : "text-amber-800"}`}
                            >
                                Complete Your Profile (65%)
                            </h4>
                            <p
                                className={`text-sm mt-1 ${isDark ? "text-amber-400/70" : "text-amber-700"}`}
                            >
                                A complete profile increases your chances of
                                finding the perfect rental by 3x.
                            </p>
                            <div
                                className={`w-full h-2 rounded-full mt-3 ${isDark ? "bg-amber-500/20" : "bg-amber-200"}`}
                            >
                                <div
                                    className="h-full rounded-full bg-amber-500"
                                    style={{ width: "65%" }}
                                />
                            </div>
                            <Link
                                href="/profile"
                                className={`inline-flex items-center gap-1 mt-3 text-sm font-medium ${
                                    isDark
                                        ? "text-amber-400 hover:text-amber-300"
                                        : "text-amber-700 hover:text-amber-800"
                                }`}
                            >
                                Complete Profile{" "}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Stats & Activity Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: "Properties Viewed",
                        value: "47",
                        icon: <Eye className="w-5 h-5" />,
                        color: "blue",
                    },
                    {
                        label: "Inquiries Sent",
                        value: "12",
                        icon: <MessageSquare className="w-5 h-5" />,
                        color: "emerald",
                    },
                    {
                        label: "Saved Listings",
                        value: "5",
                        icon: <Heart className="w-5 h-5" />,
                        color: "rose",
                    },
                    {
                        label: "Roommate Matches",
                        value: "8",
                        icon: <Users className="w-5 h-5" />,
                        color: "purple",
                    },
                ].map((stat, idx) => (
                    <div
                        key={idx}
                        className={`p-4 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                    >
                        <div
                            className={`inline-flex p-2 rounded-lg mb-3 ${
                                stat.color === "blue"
                                    ? isDark
                                        ? "bg-blue-500/10 text-blue-400"
                                        : "bg-blue-50 text-blue-600"
                                    : stat.color === "emerald"
                                      ? isDark
                                          ? "bg-emerald-500/10 text-emerald-400"
                                          : "bg-emerald-50 text-emerald-600"
                                      : stat.color === "rose"
                                        ? isDark
                                            ? "bg-rose-500/10 text-rose-400"
                                            : "bg-rose-50 text-rose-600"
                                        : isDark
                                          ? "bg-purple-500/10 text-purple-400"
                                          : "bg-purple-50 text-purple-600"
                            }`}
                        >
                            {stat.icon}
                        </div>
                        <p
                            className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            {stat.value}
                        </p>
                        <p
                            className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                        >
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recommended Listings */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Recommended for You
                        </h3>
                        <Link
                            href="/search"
                            className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recommendations.map((listing, idx) => (
                            <div
                                key={idx}
                                className={`p-4 rounded-xl ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-50 hover:bg-slate-100"} transition-colors cursor-pointer`}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                                    >
                                        <Home
                                            className={`w-8 h-8 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p
                                                className={`font-semibold truncate ${isDark ? "text-white" : "text-slate-900"}`}
                                            >
                                                {listing.name}
                                            </p>
                                            {listing.verified && (
                                                <CheckCircle
                                                    className={`w-4 h-4 flex-shrink-0 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                                                />
                                            )}
                                        </div>
                                        <p
                                            className={`text-sm flex items-center gap-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                        >
                                            <MapPin className="w-3 h-3" />
                                            {listing.location}
                                        </p>
                                        <div
                                            className={`flex items-center gap-3 mt-2 text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                        >
                                            <span>
                                                {listing.beds === 0
                                                    ? "Studio"
                                                    : `${listing.beds} bed`}
                                            </span>
                                            <span>•</span>
                                            <span>{listing.baths} bath</span>
                                            <span>•</span>
                                            <span>{listing.sqft} sqft</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-amber-500" />
                                                <span
                                                    className={`text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                                >
                                                    {listing.rating}
                                                </span>
                                            </div>
                                            <p
                                                className={`font-bold ${isDark ? "text-primary-400" : "text-primary-600"}`}
                                            >
                                                {listing.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Roommate Matches */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Roommate Matches
                        </h3>
                        <Link
                            href="/roommates"
                            className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {roommateMatches.map((match, idx) => (
                            <div
                                key={idx}
                                className={`p-4 rounded-xl ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-50 hover:bg-slate-100"} transition-colors cursor-pointer`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}
                                    >
                                        <span
                                            className={`text-lg font-semibold ${isDark ? "text-purple-400" : "text-purple-600"}`}
                                        >
                                            {match.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                                        >
                                            {match.name}
                                        </p>
                                        <p
                                            className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                        >
                                            {match.age} • {match.occupation}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p
                                            className={`text-xl font-bold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                                        >
                                            {match.compatibility}%
                                        </p>
                                        <p
                                            className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                        >
                                            match
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {match.interests.map((interest, iIdx) => (
                                        <span
                                            key={iIdx}
                                            className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                                isDark
                                                    ? "bg-white/10 text-slate-300"
                                                    : "bg-slate-200 text-slate-700"
                                            }`}
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Helpful Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Budget Planner */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className={`p-2 rounded-lg ${isDark ? "bg-emerald-500/20" : "bg-emerald-100"}`}
                        >
                            <Calculator
                                className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                            />
                        </div>
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Budget Planner
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span
                                    className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
                                >
                                    Your Budget
                                </span>
                                <span
                                    className={`text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                >
                                    $800 - $1,200/mo
                                </span>
                            </div>
                            <div
                                className={`h-2 rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                            >
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                                    style={{ width: "65%" }}
                                />
                            </div>
                        </div>
                        <div
                            className={`p-3 rounded-lg ${isDark ? "bg-white/5" : "bg-slate-50"}`}
                        >
                            <p
                                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
                            >
                                <Lightbulb className="w-4 h-4 inline mr-1" />
                                Pro tip: Consider roommates to save up to 40% on
                                rent!
                            </p>
                        </div>
                        <Link
                            href="/budget-calculator"
                            className={`block w-full text-center py-2 rounded-lg font-medium ${
                                isDark
                                    ? "bg-white/10 text-white hover:bg-white/20"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            } transition-colors`}
                        >
                            Adjust Budget
                        </Link>
                    </div>
                </div>

                {/* Application Status */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className={`p-2 rounded-lg ${isDark ? "bg-blue-500/20" : "bg-blue-100"}`}
                        >
                            <ClipboardList
                                className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                            />
                        </div>
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            My Applications
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            {
                                property: "Sunny Studio",
                                status: "Under Review",
                                days: 2,
                            },
                            {
                                property: "Shared 2BR",
                                status: "Pending",
                                days: 5,
                            },
                        ].map((app, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg ${isDark ? "bg-white/5" : "bg-slate-50"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <p
                                        className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                    >
                                        {app.property}
                                    </p>
                                    <span
                                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            app.status === "Under Review"
                                                ? isDark
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : "bg-blue-100 text-blue-700"
                                                : isDark
                                                  ? "bg-amber-500/20 text-amber-400"
                                                  : "bg-amber-100 text-amber-700"
                                        }`}
                                    >
                                        {app.status}
                                    </span>
                                </div>
                                <p
                                    className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                >
                                    Submitted {app.days} days ago
                                </p>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/applications"
                        className={`mt-4 block text-center text-sm font-medium ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                    >
                        View All Applications
                    </Link>
                </div>

                {/* Safety Tips */}
                <div
                    className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className={`p-2 rounded-lg ${isDark ? "bg-amber-500/20" : "bg-amber-100"}`}
                        >
                            <Shield
                                className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-600"}`}
                            />
                        </div>
                        <h3
                            className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                            Stay Safe
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            "Always verify landlord identity",
                            "Never pay before viewing",
                            "Use secure payment methods",
                            "Read lease terms carefully",
                        ].map((tip, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <CheckCircle
                                    className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                                />
                                <span
                                    className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}
                                >
                                    {tip}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/safety-guide"
                        className={`mt-4 block text-center text-sm font-medium ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                    >
                        Read Full Safety Guide
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div
                className={`p-6 rounded-xl border ${isDark ? "bg-dark-800/50 border-white/10" : "bg-white border-slate-200"}`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3
                        className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                        Recent Activity
                    </h3>
                    <Link
                        href="/activity"
                        className={`text-sm font-medium flex items-center gap-1 ${isDark ? "text-primary-400 hover:text-primary-300" : "text-primary-600 hover:text-primary-500"}`}
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        {
                            action: "Saved listing",
                            detail: "Sunny Studio in Manhattan",
                            time: "2 hours ago",
                            icon: <Heart className="w-4 h-4" />,
                        },
                        {
                            action: "Inquiry sent",
                            detail: "Shared 2BR Apartment",
                            time: "1 day ago",
                            icon: <MessageSquare className="w-4 h-4" />,
                        },
                        {
                            action: "Profile updated",
                            detail: "Added preferences",
                            time: "2 days ago",
                            icon: <UserCheck className="w-4 h-4" />,
                        },
                        {
                            action: "Viewed listing",
                            detail: "Cozy Room Near Subway",
                            time: "3 days ago",
                            icon: <Eye className="w-4 h-4" />,
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}
                        >
                            <div
                                className={`inline-flex p-2 rounded-lg mb-3 ${isDark ? "bg-white/10" : "bg-slate-200"}`}
                            >
                                <span
                                    className={
                                        isDark
                                            ? "text-slate-400"
                                            : "text-slate-600"
                                    }
                                >
                                    {item.icon}
                                </span>
                            </div>
                            <p
                                className={`font-medium text-sm ${isDark ? "text-white" : "text-slate-900"}`}
                            >
                                {item.action}
                            </p>
                            <p
                                className={`text-xs truncate ${isDark ? "text-slate-500" : "text-slate-500"}`}
                            >
                                {item.detail}
                            </p>
                            <p
                                className={`text-xs mt-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}
                            >
                                {item.time}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Helpful Resources */}
            <div
                className={`p-6 rounded-xl border ${isDark ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"}`}
            >
                <div className="flex items-center gap-3 mb-4">
                    <Compass
                        className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                    />
                    <h3
                        className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                        Get Started
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            title: "First-Time Renter Guide",
                            desc: "Everything you need to know",
                            icon: <BookOpen className="w-5 h-5" />,
                            href: "/guides/first-time",
                        },
                        {
                            title: "Neighborhood Explorer",
                            desc: "Find your ideal area",
                            icon: <Map className="w-5 h-5" />,
                            href: "/neighborhoods",
                        },
                        {
                            title: "Cost Calculator",
                            desc: "Plan your monthly expenses",
                            icon: <Calculator className="w-5 h-5" />,
                            href: "/calculator",
                        },
                    ].map((resource, idx) => (
                        <Link
                            key={idx}
                            href={resource.href}
                            className={`flex items-center gap-4 p-4 rounded-xl ${
                                isDark
                                    ? "bg-white/5 hover:bg-white/10"
                                    : "bg-white hover:bg-slate-50"
                            } transition-colors`}
                        >
                            <div
                                className={`p-2.5 rounded-xl ${isDark ? "bg-white/10" : "bg-slate-100"}`}
                            >
                                <span
                                    className={
                                        isDark
                                            ? "text-primary-400"
                                            : "text-primary-600"
                                    }
                                >
                                    {resource.icon}
                                </span>
                            </div>
                            <div>
                                <p
                                    className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}
                                >
                                    {resource.title}
                                </p>
                                <p
                                    className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                >
                                    {resource.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================
// QUICK ACTION COMPONENT
// ============================================
interface QuickActionProps {
    isDark: boolean;
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    color: "blue" | "emerald" | "purple" | "rose" | "amber";
    badge?: string;
}

function QuickAction({
    isDark,
    icon,
    title,
    description,
    href,
    color,
    badge,
}: QuickActionProps) {
    const colorClasses = {
        blue: isDark
            ? "bg-blue-500/20 text-blue-400"
            : "bg-blue-100 text-blue-600",
        emerald: isDark
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-emerald-100 text-emerald-600",
        purple: isDark
            ? "bg-purple-500/20 text-purple-400"
            : "bg-purple-100 text-purple-600",
        rose: isDark
            ? "bg-rose-500/20 text-rose-400"
            : "bg-rose-100 text-rose-600",
        amber: isDark
            ? "bg-amber-500/20 text-amber-400"
            : "bg-amber-100 text-amber-600",
    };

    return (
        <Link
            href={href}
            className={`group relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                isDark
                    ? "bg-dark-800/50 border-white/10 hover:bg-dark-800 hover:border-white/20"
                    : "bg-white border-slate-200 hover:shadow-lg hover:border-slate-300"
            }`}
        >
            <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4
                        className={`font-semibold truncate ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                        {title}
                    </h4>
                    {badge && (
                        <span
                            className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${colorClasses[color]}`}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                <p
                    className={`text-sm mt-0.5 truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                    {description}
                </p>
            </div>
            <ArrowUpRight
                className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${isDark ? "text-slate-400" : "text-slate-400"}`}
            />
        </Link>
    );
}
