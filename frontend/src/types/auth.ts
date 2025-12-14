// Role types for the rental house and roommate finder app
export type UserRole = "ROLE_USER" | "ROLE_HOUSE_OWNER" | "ROLE_ADMIN";

export type AuthProvider = "LOCAL" | "GOOGLE";

export interface User {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    profilePictureUrl: string | null;
    bio: string | null;
    address: string | null;
    city: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    roleSelected: boolean;
    authProvider: AuthProvider;
    roles: string[];
    createdAt: string;
    lastLoginAt: string | null;
    enabled: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: AuthUser;
}

// User object returned in auth responses
export interface AuthUser {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    profilePictureUrl: string | null;
    bio: string | null;
    address: string | null;
    city: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    roles: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: "USER" | "HOUSE_OWNER"; // Admin is assigned manually
    bio?: string;
    address?: string;
    city?: string;
}

export interface RoleSelectionRequest {
    role: "USER" | "HOUSE_OWNER";
}

export interface TokenRefreshRequest {
    refreshToken: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isHouseOwner: boolean;
    isRegularUser: boolean;
    needsRoleSelection: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    loginWithGoogle: () => void;
    refreshUser: () => Promise<void>;
}

export interface ApiError {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

// Admin dashboard types
export interface AdminStats {
    totalUsers: number;
    totalHouseOwners: number;
    totalRegularUsers: number;
    totalAdmins: number;
}

// Helper functions for role checking
export const hasRole = (user: User | null, role: UserRole): boolean => {
    return user?.roles?.includes(role) ?? false;
};

export const isAdmin = (user: User | null): boolean => {
    return hasRole(user, "ROLE_ADMIN");
};

export const isHouseOwner = (user: User | null): boolean => {
    return hasRole(user, "ROLE_HOUSE_OWNER");
};

export const isRegularUser = (user: User | null): boolean => {
    return hasRole(user, "ROLE_USER") && !isAdmin(user) && !isHouseOwner(user);
};

export const needsRoleSelection = (user: User | null): boolean => {
    return user !== null && !user.roleSelected && user.authProvider !== "LOCAL";
};

export const getPrimaryRole = (user: User | null): string => {
    if (isAdmin(user)) return "Admin";
    if (isHouseOwner(user)) return "House Owner";
    return "User";
};

export const getRoleDisplayName = (role: string): string => {
    switch (role) {
        case "ROLE_ADMIN":
            return "Admin";
        case "ROLE_HOUSE_OWNER":
            return "House Owner";
        case "ROLE_USER":
            return "User";
        default:
            return role.replace("ROLE_", "");
    }
};

export const getRoleBadgeColor = (role: string): string => {
    switch (role) {
        case "ROLE_ADMIN":
            return "bg-red-100 text-red-700";
        case "ROLE_HOUSE_OWNER":
            return "bg-blue-100 text-blue-700";
        case "ROLE_USER":
            return "bg-green-100 text-green-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

// ============================================
// MESSAGING TYPES
// ============================================

export type MessageType = "TEXT" | "IMAGE" | "FILE" | "SYSTEM";

export interface MessageResponse {
    id: number;
    conversationId: number;
    senderId: number;
    senderName: string;
    senderProfilePicture: string | null;
    recipientId: number;
    recipientName: string;
    content: string;
    messageType: MessageType;
    attachmentUrl: string | null;
    attachmentName: string | null;
    read: boolean;
    readAt: string | null;
    createdAt: string;
    isOwnMessage: boolean;
}

export interface ConversationResponse {
    id: number;
    otherParticipantId: number;
    otherParticipantName: string;
    otherParticipantProfilePicture: string | null;
    otherParticipantOnline: boolean;
    subject: string | null;
    propertyId: number | null;
    propertyTitle: string | null;
    lastMessage: string | null;
    lastMessageAt: string | null;
    unreadCount: number;
    createdAt: string;
}

export interface SendMessageRequest {
    conversationId?: number;
    recipientId?: number;
    content: string;
    messageType?: MessageType;
    attachmentUrl?: string;
    attachmentName?: string;
    propertyId?: number;
    propertyTitle?: string;
    subject?: string;
}

export interface CreateConversationRequest {
    recipientId: number;
    subject?: string;
    propertyId?: number;
    propertyTitle?: string;
    initialMessage?: string;
}

export interface ConversationListResponse {
    conversations: ConversationResponse[];
    totalUnreadCount: number;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface MessageListResponse {
    messages: MessageResponse[];
    conversation: ConversationResponse;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface UnreadCountResponse {
    totalUnreadCount: number;
    unreadByConversation: Record<number, number>;
}

export interface MarkAsReadRequest {
    conversationId?: number;
    messageIds?: number[];
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType =
    | "NEW_MESSAGE"
    | "BOOKING_REQUEST"
    | "BOOKING_CONFIRMED"
    | "BOOKING_CANCELLED"
    | "BOOKING_REMINDER"
    | "PROPERTY_INQUIRY"
    | "PROPERTY_APPROVED"
    | "PROPERTY_REJECTED"
    | "PROPERTY_VIEWED"
    | "LISTING_SAVED"
    | "PRICE_DROP"
    | "REVIEW_RECEIVED"
    | "REVIEW_REPLY"
    | "PROFILE_VIEWED"
    | "VERIFICATION_APPROVED"
    | "VERIFICATION_REQUIRED"
    | "ROOMMATE_MATCH"
    | "ROOMMATE_REQUEST"
    | "SYSTEM_ANNOUNCEMENT"
    | "WELCOME"
    | "ACCOUNT_UPDATE"
    | "SECURITY_ALERT"
    | "PAYMENT_RECEIVED"
    | "PAYMENT_FAILED"
    | "PAYOUT_SENT";

export interface NotificationResponse {
    id: number;
    type: NotificationType;
    typeDisplayName: string;
    title: string;
    message: string;
    read: boolean;
    readAt: string | null;
    actionUrl: string | null;
    icon: string;
    iconColor: string;
    senderId: number | null;
    senderName: string | null;
    senderAvatar: string | null;
    propertyId: number | null;
    propertyTitle: string | null;
    conversationId: number | null;
    bookingId: number | null;
    reviewId: number | null;
    createdAt: string;
    timeAgo: string;
}

export interface NotificationListResponse {
    notifications: NotificationResponse[];
    unreadCount: number;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasMore: boolean;
}

export interface NotificationUnreadCountResponse {
    totalUnread: number;
    countByType: Record<string, number>;
}

export interface NotificationSummary {
    totalUnread: number;
    messagesUnread: number;
    bookingsUnread: number;
    propertyUnread: number;
    systemUnread: number;
    recentNotifications: NotificationResponse[];
}

export interface NotificationMarkAsReadRequest {
    notificationIds?: number[];
    markAll?: boolean;
}

export interface NotificationDeleteRequest {
    notificationIds?: number[];
    deleteAll?: boolean;
    deleteReadOnly?: boolean;
}

// Helper function to get notification icon color classes
export const getNotificationIconColor = (
    color: string,
    isDark: boolean,
): string => {
    const colors: Record<string, { light: string; dark: string }> = {
        blue: {
            light: "text-blue-600 bg-blue-100",
            dark: "text-blue-400 bg-blue-500/20",
        },
        green: {
            light: "text-emerald-600 bg-emerald-100",
            dark: "text-emerald-400 bg-emerald-500/20",
        },
        red: {
            light: "text-red-600 bg-red-100",
            dark: "text-red-400 bg-red-500/20",
        },
        orange: {
            light: "text-orange-600 bg-orange-100",
            dark: "text-orange-400 bg-orange-500/20",
        },
        purple: {
            light: "text-purple-600 bg-purple-100",
            dark: "text-purple-400 bg-purple-500/20",
        },
        pink: {
            light: "text-pink-600 bg-pink-100",
            dark: "text-pink-400 bg-pink-500/20",
        },
        yellow: {
            light: "text-amber-600 bg-amber-100",
            dark: "text-amber-400 bg-amber-500/20",
        },
        cyan: {
            light: "text-cyan-600 bg-cyan-100",
            dark: "text-cyan-400 bg-cyan-500/20",
        },
        slate: {
            light: "text-slate-600 bg-slate-100",
            dark: "text-slate-400 bg-slate-500/20",
        },
    };
    return isDark
        ? colors[color]?.dark || colors.slate.dark
        : colors[color]?.light || colors.slate.light;
};
