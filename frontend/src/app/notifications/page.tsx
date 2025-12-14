"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import { notificationApi } from "@/lib/api";
import {
    NotificationResponse,
    NotificationType,
    getNotificationIconColor,
} from "@/types/auth";
import {
    Bell,
    BellOff,
    Check,
    CheckCheck,
    Trash2,
    Filter,
    MessageSquare,
    Calendar,
    Building,
    Star,
    Shield,
    Users,
    Megaphone,
    Settings,
    AlertTriangle,
    CreditCard,
    Wallet,
    Eye,
    Heart,
    TrendingDown,
    HelpCircle,
    UserPlus,
    Sparkles,
    Loader2,
    ChevronDown,
    MoreHorizontal,
    X,
    RefreshCw,
} from "lucide-react";
import Link from "next/link";

// Icon mapping for notification types
const getNotificationIcon = (type: NotificationType, iconName?: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        "message-square": <MessageSquare className="w-5 h-5" />,
        calendar: <Calendar className="w-5 h-5" />,
        "check-circle": <Check className="w-5 h-5" />,
        "x-circle": <X className="w-5 h-5" />,
        clock: <RefreshCw className="w-5 h-5" />,
        "help-circle": <HelpCircle className="w-5 h-5" />,
        check: <Check className="w-5 h-5" />,
        x: <X className="w-5 h-5" />,
        eye: <Eye className="w-5 h-5" />,
        heart: <Heart className="w-5 h-5" />,
        "trending-down": <TrendingDown className="w-5 h-5" />,
        star: <Star className="w-5 h-5" />,
        "message-circle": <MessageSquare className="w-5 h-5" />,
        user: <Users className="w-5 h-5" />,
        "shield-check": <Shield className="w-5 h-5" />,
        "shield-alert": <AlertTriangle className="w-5 h-5" />,
        users: <Users className="w-5 h-5" />,
        "user-plus": <UserPlus className="w-5 h-5" />,
        megaphone: <Megaphone className="w-5 h-5" />,
        sparkles: <Sparkles className="w-5 h-5" />,
        settings: <Settings className="w-5 h-5" />,
        "alert-triangle": <AlertTriangle className="w-5 h-5" />,
        "credit-card": <CreditCard className="w-5 h-5" />,
        wallet: <Wallet className="w-5 h-5" />,
    };

    if (iconName && iconMap[iconName]) {
        return iconMap[iconName];
    }

    // Default icons by type
    switch (type) {
        case "NEW_MESSAGE":
            return <MessageSquare className="w-5 h-5" />;
        case "BOOKING_REQUEST":
        case "BOOKING_CONFIRMED":
        case "BOOKING_CANCELLED":
        case "BOOKING_REMINDER":
            return <Calendar className="w-5 h-5" />;
        case "PROPERTY_INQUIRY":
        case "PROPERTY_APPROVED":
        case "PROPERTY_REJECTED":
        case "PROPERTY_VIEWED":
        case "LISTING_SAVED":
            return <Building className="w-5 h-5" />;
        case "REVIEW_RECEIVED":
        case "REVIEW_REPLY":
            return <Star className="w-5 h-5" />;
        case "VERIFICATION_APPROVED":
        case "VERIFICATION_REQUIRED":
            return <Shield className="w-5 h-5" />;
        case "ROOMMATE_MATCH":
        case "ROOMMATE_REQUEST":
            return <Users className="w-5 h-5" />;
        case "SYSTEM_ANNOUNCEMENT":
        case "WELCOME":
            return <Megaphone className="w-5 h-5" />;
        case "SECURITY_ALERT":
            return <AlertTriangle className="w-5 h-5" />;
        case "PAYMENT_RECEIVED":
        case "PAYMENT_FAILED":
        case "PAYOUT_SENT":
            return <Wallet className="w-5 h-5" />;
        default:
            return <Bell className="w-5 h-5" />;
    }
};

type FilterType = "all" | "unread" | "messages" | "bookings" | "property" | "system";

interface FilterOption {
    id: FilterType;
    label: string;
    icon: React.ReactNode;
}

const filterOptions: FilterOption[] = [
    { id: "all", label: "All", icon: <Bell className="w-4 h-4" /> },
    { id: "unread", label: "Unread", icon: <BellOff className="w-4 h-4" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "bookings", label: "Bookings", icon: <Calendar className="w-4 h-4" /> },
    { id: "property", label: "Property", icon: <Building className="w-4 h-4" /> },
    { id: "system", label: "System", icon: <Settings className="w-4 h-4" /> },
];

export default function NotificationsPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const { isDark } = useTheme();

    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [unreadCount, setUnreadCount] = useState(0);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedNotifications, setSelectedNotifications] = useState<Set<number>>(new Set());
    const [isSelectMode, setIsSelectMode] = useState(false);

    // Fetch notifications
    const fetchNotifications = useCallback(async (reset: boolean = false) => {
        try {
            if (reset) {
                setIsLoading(true);
                setPage(0);
            } else {
                setIsLoadingMore(true);
            }

            const currentPage = reset ? 0 : page;
            let filterParam: string | undefined;

            switch (activeFilter) {
                case "unread":
                    filterParam = "unread";
                    break;
                case "messages":
                    filterParam = "NEW_MESSAGE";
                    break;
                case "bookings":
                    filterParam = "BOOKING_REQUEST";
                    break;
                case "property":
                    filterParam = "PROPERTY_INQUIRY";
                    break;
                case "system":
                    filterParam = "SYSTEM_ANNOUNCEMENT";
                    break;
                default:
                    filterParam = undefined;
            }

            const response = await notificationApi.getNotifications(currentPage, 20, filterParam);

            if (reset) {
                setNotifications(response.notifications);
            } else {
                setNotifications((prev) => [...prev, ...response.notifications]);
            }

            setUnreadCount(response.unreadCount);
            setHasMore(response.hasMore);
            if (!reset) {
                setPage(currentPage + 1);
            }
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, [activeFilter, page]);

    // Initial load
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
            return;
        }

        if (isAuthenticated) {
            fetchNotifications(true);
        }
    }, [authLoading, isAuthenticated, router]);

    // Refetch when filter changes
    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications(true);
        }
    }, [activeFilter, isAuthenticated]);

    // Polling for new notifications
    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(() => {
            fetchNotifications(true);
        }, 30000); // Every 30 seconds

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    // Mark single notification as read
    const handleMarkAsRead = async (notificationId: number) => {
        try {
            await notificationApi.markSingleAsRead(notificationId);
            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === notificationId ? { ...n, read: true } : n
                )
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    // Mark all as read
    const handleMarkAllAsRead = async () => {
        try {
            await notificationApi.markAllAsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    };

    // Delete single notification
    const handleDeleteNotification = async (notificationId: number) => {
        try {
            await notificationApi.deleteNotification(notificationId);
            setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    // Delete selected notifications
    const handleDeleteSelected = async () => {
        try {
            await notificationApi.deleteNotifications({
                notificationIds: Array.from(selectedNotifications),
            });
            setNotifications((prev) =>
                prev.filter((n) => !selectedNotifications.has(n.id))
            );
            setSelectedNotifications(new Set());
            setIsSelectMode(false);
        } catch (error) {
            console.error("Failed to delete selected notifications:", error);
        }
    };

    // Handle notification click
    const handleNotificationClick = async (notification: NotificationResponse) => {
        if (!notification.read) {
            await handleMarkAsRead(notification.id);
        }
        if (notification.actionUrl) {
            router.push(notification.actionUrl);
        }
    };

    // Toggle notification selection
    const toggleSelection = (notificationId: number) => {
        setSelectedNotifications((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(notificationId)) {
                newSet.delete(notificationId);
            } else {
                newSet.add(notificationId);
            }
            return newSet;
        });
    };

    // Group notifications by date
    const groupNotificationsByDate = (notifs: NotificationResponse[]) => {
        const groups: { label: string; notifications: NotificationResponse[] }[] = [];
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let currentLabel = "";

        notifs.forEach((notification) => {
            const date = new Date(notification.createdAt);
            let label: string;

            if (date.toDateString() === today.toDateString()) {
                label = "Today";
            } else if (date.toDateString() === yesterday.toDateString()) {
                label = "Yesterday";
            } else if (date > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
                label = "This Week";
            } else if (date > new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)) {
                label = "This Month";
            } else {
                label = "Older";
            }

            if (label !== currentLabel) {
                currentLabel = label;
                groups.push({ label, notifications: [notification] });
            } else {
                groups[groups.length - 1].notifications.push(notification);
            }
        });

        return groups;
    };

    const notificationGroups = groupNotificationsByDate(notifications);

    if (authLoading || isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2
                            className={`w-8 h-8 animate-spin ${
                                isDark ? "text-primary-400" : "text-primary-600"
                            }`}
                        />
                        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                            Loading notifications...
                        </p>
                    </div>
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
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                                Notifications
                            </h1>
                            <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                {unreadCount > 0
                                    ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                                    : "You're all caught up!"}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Mark all as read button */}
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                        isDark
                                            ? "text-primary-400 hover:bg-primary-500/10"
                                            : "text-primary-600 hover:bg-primary-50"
                                    }`}
                                >
                                    <CheckCheck className="w-4 h-4" />
                                    Mark all as read
                                </button>
                            )}

                            {/* Select mode toggle */}
                            <button
                                onClick={() => {
                                    setIsSelectMode(!isSelectMode);
                                    setSelectedNotifications(new Set());
                                }}
                                className={`p-2 rounded-lg transition-colors ${
                                    isSelectMode
                                        ? isDark
                                            ? "bg-primary-500/20 text-primary-400"
                                            : "bg-primary-100 text-primary-600"
                                        : isDark
                                        ? "hover:bg-white/10 text-slate-400"
                                        : "hover:bg-slate-100 text-slate-500"
                                }`}
                                title="Select notifications"
                            >
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        {filterOptions.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                    activeFilter === filter.id
                                        ? isDark
                                            ? "bg-primary-500 text-white"
                                            : "bg-slate-900 text-white"
                                        : isDark
                                        ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                }`}
                            >
                                {filter.icon}
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Selected Actions Bar */}
                    {isSelectMode && selectedNotifications.size > 0 && (
                         <div
                            className={`px-4 py-2 border-t flex items-center justify-between ${
                                isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                            }`}
                        >
                            <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                {selectedNotifications.size} selected
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSelectedNotifications(new Set())}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                                        isDark
                                            ? "text-slate-400 hover:bg-white/10"
                                            : "text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleDeleteSelected}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Notifications List - Scrollable Area */}
                <div className={`flex-1 overflow-y-auto ${isDark ? "bg-dark-900/20" : "bg-slate-50/50"}`}>
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                                    isDark ? "bg-white/5" : "bg-white"
                                }`}
                            >
                                <Bell
                                    className={`w-8 h-8 ${
                                        isDark ? "text-slate-500" : "text-slate-400"
                                    }`}
                                />
                            </div>
                            <h3
                                className={`text-lg font-semibold mb-2 ${
                                    isDark ? "text-white" : "text-slate-900"
                                }`}
                            >
                                No notifications
                            </h3>
                            <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                                {activeFilter === "unread"
                                    ? "You've read all your notifications"
                                    : "You don't have any notifications yet"}
                            </p>
                        </div>
                    ) : (
                        <div className="p-0">
                            {notificationGroups.map((group, groupIdx) => (
                                <div key={groupIdx}>
                                    {/* Date Group Header */}
                                    <div className={`sticky top-0 z-10 backdrop-blur-md px-4 py-2 border-b ${isDark ? "bg-dark-900/80 border-white/5" : "bg-white/80 border-slate-100"}`}>
                                         <h3
                                            className={`text-xs font-semibold uppercase tracking-wider ${
                                                isDark ? "text-slate-500" : "text-slate-400"
                                            }`}
                                        >
                                            {group.label}
                                        </h3>
                                    </div>
                                   

                                    {/* Notifications in Group */}
                                    <div>
                                        {group.notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`relative flex items-start gap-4 p-4 transition-colors border-b ${
                                                    isDark ? "border-white/5 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"
                                                } ${
                                                    !notification.read
                                                        ? isDark
                                                            ? "bg-primary-500/5"
                                                            : "bg-primary-50/50"
                                                        : ""
                                                } ${
                                                    isSelectMode
                                                        ? "cursor-pointer"
                                                        : notification.actionUrl
                                                        ? "cursor-pointer"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    isSelectMode
                                                        ? toggleSelection(notification.id)
                                                        : handleNotificationClick(notification)
                                                }
                                            >
                                                {/* Selection Checkbox */}
                                                {isSelectMode && (
                                                    <div className="flex-shrink-0 pt-1">
                                                        <div
                                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                                                selectedNotifications.has(notification.id)
                                                                    ? "bg-primary-500 border-primary-500"
                                                                    : isDark
                                                                    ? "border-slate-600"
                                                                    : "border-slate-300"
                                                            }`}
                                                        >
                                                            {selectedNotifications.has(notification.id) && (
                                                                <Check className="w-3 h-3 text-white" />
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Icon */}
                                                <div
                                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getNotificationIconColor(
                                                        notification.iconColor,
                                                        isDark
                                                    )}`}
                                                >
                                                    {notification.senderAvatar ? (
                                                        <img
                                                            src={notification.senderAvatar}
                                                            alt=""
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        getNotificationIcon(notification.type, notification.icon)
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <p
                                                                className={`font-medium ${
                                                                    isDark ? "text-white" : "text-slate-900"
                                                                }`}
                                                            >
                                                                {notification.title}
                                                            </p>
                                                            <p
                                                                className={`text-sm mt-0.5 line-clamp-2 ${
                                                                    isDark
                                                                        ? "text-slate-400"
                                                                        : "text-slate-600"
                                                                }`}
                                                            >
                                                                {notification.message}
                                                            </p>
                                                            {notification.propertyTitle && (
                                                                <p
                                                                    className={`text-xs mt-1 flex items-center gap-1 ${
                                                                        isDark
                                                                            ? "text-slate-500"
                                                                            : "text-slate-500"
                                                                    }`}
                                                                >
                                                                    <Building className="w-3 h-3" />
                                                                    {notification.propertyTitle}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Time and Actions */}
                                                        <div className="flex-shrink-0 flex flex-col items-end gap-2">
                                                            <span
                                                                className={`text-xs whitespace-nowrap ${
                                                                    isDark
                                                                        ? "text-slate-500"
                                                                        : "text-slate-400"
                                                                }`}
                                                            >
                                                                {notification.timeAgo}
                                                            </span>

                                                            {/* Action buttons - visible on hover */}
                                                            {!isSelectMode && (
                                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    {!notification.read && (
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleMarkAsRead(notification.id);
                                                                            }}
                                                                            className={`p-1 rounded transition-colors ${
                                                                                isDark
                                                                                    ? "hover:bg-white/10 text-slate-500 hover:text-white"
                                                                                    : "hover:bg-slate-200 text-slate-400 hover:text-slate-700"
                                                                            }`}
                                                                            title="Mark as read"
                                                                        >
                                                                            <Check className="w-4 h-4" />
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeleteNotification(notification.id);
                                                                        }}
                                                                        className={`p-1 rounded transition-colors ${
                                                                            isDark
                                                                                ? "hover:bg-red-500/20 text-slate-500 hover:text-red-400"
                                                                                : "hover:bg-red-100 text-slate-400 hover:text-red-600"
                                                                        }`}
                                                                        title="Delete"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Unread Indicator */}
                                                {!notification.read && !isSelectMode && (
                                                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
                                                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Load More Button */}
                            {hasMore && (
                                <div className="flex justify-center py-6">
                                    <button
                                        onClick={() => fetchNotifications(false)}
                                        disabled={isLoadingMore}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                                            isDark
                                                ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                        }`}
                                    >
                                        {isLoadingMore ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="w-4 h-4" />
                                                Load more
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
