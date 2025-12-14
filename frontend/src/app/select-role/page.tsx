"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import {
    Users,
    ArrowRight,
    CheckCircle,
    Loader2,
    Shield,
    Key,
} from "lucide-react";
import Link from "next/link";

type RoleOption = "USER" | "HOUSE_OWNER";

interface RoleCardProps {
    role: RoleOption;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    isSelected: boolean;
    onSelect: () => void;
}

function RoleCard({
    role,
    title,
    description,
    icon,
    features,
    isSelected,
    onSelect,
}: RoleCardProps) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`relative w-full p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            }`}
        >
            {isSelected && (
                <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
            )}

            <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? "bg-blue-600" : "bg-gray-100"
                }`}
            >
                <div className={isSelected ? "text-white" : "text-gray-600"}>
                    {icon}
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>

            <ul className="space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                isSelected ? "text-blue-600" : "text-green-500"
                            }`}
                        />
                        <span className="text-gray-700">{feature}</span>
                    </li>
                ))}
            </ul>
        </button>
    );
}

export default function SelectRolePage() {
    const router = useRouter();
    const { user, isLoading: authLoading, refreshUser } = useAuth();
    const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect if user doesn't need role selection
    useEffect(() => {
        if (!authLoading && user) {
            // If role is already selected, redirect to dashboard
            if (user.roleSelected || user.authProvider === "LOCAL") {
                router.replace("/dashboard");
            }
        } else if (!authLoading && !user) {
            // If not logged in, redirect to login
            router.replace("/login");
        }
    }, [user, authLoading, router]);

    const handleSubmit = async () => {
        if (!selectedRole) {
            setError("Please select a role to continue");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            console.log("Submitting role selection:", selectedRole);
            const result = await authApi.selectRole({ role: selectedRole });
            console.log("Role selection result:", result);
            await refreshUser();
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Role selection error:", err);
            console.error("Error response:", err.response);
            console.error("Error response data:", err.response?.data);

            if (err.response?.status === 400) {
                setError(
                    err.response?.data?.message ||
                        "Role has already been selected. Redirecting to dashboard...",
                );
                setTimeout(() => router.push("/dashboard"), 2000);
            } else if (err.response?.status === 401) {
                setError("Session expired. Please log in again.");
                setTimeout(() => router.push("/login"), 2000);
            } else if (err.response?.status === 500) {
                const serverMessage =
                    err.response?.data?.message || "Unknown server error";
                setError(
                    `Server error: ${serverMessage}. Please try again or contact support.`,
                );
            } else {
                const errorMessage =
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    err.message ||
                    "An unexpected error occurred";
                setError(`Error: ${errorMessage}. Please try again.`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading while checking auth status
    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Logo
                            size="lg"
                            showText={false}
                            linkTo={null}
                            animated={true}
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Welcome to RentMate! 🎉
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Hi{user.firstName ? ` ${user.firstName}` : ""}! To get
                        started, please choose how you&apos;d like to use
                        RentMate. This is a one-time selection.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <RoleCard
                        role="USER"
                        title="I'm Looking to Rent"
                        description="Find your perfect rental home or roommate"
                        icon={<Users className="w-7 h-7" />}
                        features={[
                            "Browse available rental properties",
                            "Search for compatible roommates",
                            "Save favorite listings",
                            "Contact property owners directly",
                            "Create a renter profile",
                        ]}
                        isSelected={selectedRole === "USER"}
                        onSelect={() => setSelectedRole("USER")}
                    />

                    <RoleCard
                        role="HOUSE_OWNER"
                        title="I'm a Property Owner"
                        description="List your property and find tenants"
                        icon={<Key className="w-7 h-7" />}
                        features={[
                            "List your rental properties",
                            "Manage multiple property listings",
                            "Receive tenant applications",
                            "Screen potential tenants",
                            "Access owner dashboard & analytics",
                        ]}
                        isSelected={selectedRole === "HOUSE_OWNER"}
                        onSelect={() => setSelectedRole("HOUSE_OWNER")}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedRole || isSubmitting}
                        className={`inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                            selectedRole && !isSubmitting
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Setting up your account...
                            </>
                        ) : (
                            <>
                                Continue
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <p className="text-sm text-gray-500">
                        You can update your profile details later in settings
                    </p>
                </div>

                {/* Info Box */}
                <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">
                        💡 Good to know
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>
                            • This choice determines your initial experience on
                            RentMate
                        </li>
                        <li>
                            • Property owners can also browse rentals and search
                            for roommates
                        </li>
                        <li>
                            • Contact support if you need to change your account
                            type later
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
