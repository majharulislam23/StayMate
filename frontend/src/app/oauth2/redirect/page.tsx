"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setTokens, authApi } from "@/lib/api";
import Logo from "@/components/Logo";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OAuth2RedirectPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading",
    );
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const handleOAuthRedirect = async () => {
            // Get tokens from URL parameters (sent by Spring Boot OAuth2 success handler)
            const accessToken =
                searchParams.get("token") || searchParams.get("accessToken");
            const refreshToken = searchParams.get("refreshToken");
            const error = searchParams.get("error");

            if (error) {
                setStatus("error");
                setErrorMessage(decodeURIComponent(error));
                return;
            }

            if (accessToken) {
                try {
                    // Store tokens in cookies
                    setTokens(accessToken, refreshToken || accessToken);

                    // Verify the token works by fetching user data
                    const user = await authApi.getCurrentUser();

                    setStatus("success");

                    // Check if user needs to select a role (new OAuth users)
                    const needsRoleSelection =
                        !user.roleSelected && user.authProvider !== "LOCAL";

                    // Redirect after a brief delay
                    setTimeout(() => {
                        if (needsRoleSelection) {
                            // New OAuth user - redirect to role selection
                            window.location.href = "/select-role";
                        } else {
                            // Existing user or role already selected - go to dashboard
                            window.location.href = "/dashboard";
                        }
                    }, 1000);
                } catch (err) {
                    console.error("OAuth redirect error:", err);
                    setStatus("error");
                    setErrorMessage(
                        "Failed to process authentication. Please try again.",
                    );
                }
            } else {
                // No token found, might be a direct access or error
                setStatus("error");
                setErrorMessage(
                    "No authentication token received. Please try logging in again.",
                );
            }
        };

        handleOAuthRedirect();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-100">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Logo
                        size="lg"
                        showText={false}
                        linkTo={null}
                        animated={true}
                    />
                </div>

                {/* Loading State */}
                {status === "loading" && (
                    <>
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Completing Sign In
                        </h1>
                        <p className="text-gray-600">
                            Please wait while we authenticate your account...
                        </p>
                    </>
                )}

                {/* Success State */}
                {status === "success" && (
                    <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Successfully Signed In!
                        </h1>
                        <p className="text-gray-600 mb-4">
                            Setting up your account...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="bg-blue-600 h-full rounded-full animate-pulse"
                                style={{ width: "100%" }}
                            />
                        </div>
                    </>
                )}

                {/* Error State */}
                {status === "error" && (
                    <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Authentication Failed
                        </h1>
                        <p className="text-gray-600 mb-6">{errorMessage}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Go Home
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
