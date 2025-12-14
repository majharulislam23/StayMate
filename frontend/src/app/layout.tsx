import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
    title: "RentMate - Find Your Perfect Home & Roommates",
    description:
        "A modern platform for finding rental homes, connecting with roommates, and listing properties. Built with Next.js and Spring Boot.",
    keywords: [
        "rental",
        "roommates",
        "housing",
        "property listing",
        "apartment finder",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="theme-color"
                    content="#0f172a"
                    media="(prefers-color-scheme: dark)"
                />
                <meta
                    name="theme-color"
                    content="#f8fafc"
                    media="(prefers-color-scheme: light)"
                />
            </head>
            <body className="min-h-screen antialiased">
                <ThemeProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
