"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import {
    Search,
    Building,
    Users,
    ArrowRight,
    CheckCircle,
    MapPin,
    Shield,
    Heart,
    Key,
    Star,
    Sparkles,
    Zap,
    Globe,
    Home,
    MessageCircle,
    Camera,
    Bell,
    Clock,
    TrendingUp,
    Award,
    Headphones,
    CreditCard,
    Lock,
    Wifi,
    Coffee,
    Car,
    TreePine,
    Dumbbell,
    ChevronRight,
    Play,
    Quote,
    AlertTriangle,
    XCircle,
    Target,
    Brain,
    Calendar,
    FileCheck,
    UserCheck,
    BadgeCheck,
    ShieldCheck,
    Phone,
    Mail,
    MapPinned,
    Briefcase,
    GraduationCap,
    Moon,
    Sun,
    Bed,
    Bath,
    Maximize,
    ChevronDown,
    ArrowUpRight,
    Fingerprint,
    Eye,
    Timer,
    Rocket,
    HandHeart,
    Building2,
    UsersRound,
    HomeIcon,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    AlertCircle,
    CircleDollarSign,
    Banknote,
    PiggyBank,
    Wallet,
    CircleCheck,
    CircleX,
    HelpCircle,
    ChevronUp,
} from "lucide-react";
import { useState } from "react";

export default function HomePage() {
    const { isAuthenticated, isLoading } = useAuth();
    const { isDark } = useTheme();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Problem Statement Data
    const problems = [
        {
            icon: <AlertTriangle className="w-6 h-6" />,
            title: "Fake Rental Ads",
            description:
                "Scammers post fake listings to steal deposits and personal information from unsuspecting renters.",
            color: "red",
        },
        {
            icon: <XCircle className="w-6 h-6" />,
            title: "Unverified Landlords & Tenants",
            description:
                "No way to verify if the person you're dealing with is legitimate, leading to trust issues.",
            color: "orange",
        },
        {
            icon: <HelpCircle className="w-6 h-6" />,
            title: "No Clarity on Costs",
            description:
                "Hidden charges, unclear utility costs, and surprise fees make budgeting impossible.",
            color: "yellow",
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: "Difficult Communication",
            description:
                "No streamlined way to communicate between owners and tenants, leading to miscommunication.",
            color: "purple",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "No Roommate Matching",
            description:
                "Finding compatible roommates based on lifestyle is nearly impossible with traditional methods.",
            color: "blue",
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Time-Consuming Search",
            description:
                "Searching across multiple platforms wastes hours with no guarantee of finding suitable options.",
            color: "cyan",
        },
    ];

    // Core Features with detailed information
    const coreFeatures = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Verified Rental Listings",
            description:
                "Landlords can post rooms with verified rental details including photos, rent & utility costs, location maps, owner identity verification, and security deposit information.",
            benefits: [
                "Eliminates fake ads",
                "Builds trust",
                "Complete transparency",
            ],
            color: "primary",
            details: [
                "Room photos & virtual tours",
                "Rent & utility cost breakdown",
                "Interactive location map",
                "Owner identity verification",
                "Security deposit info",
            ],
        },
        {
            icon: <UsersRound className="w-8 h-8" />,
            title: "Roommate Posting by Tenants",
            description:
                "Tenants can post when they need a roommate to share rent. Enter lifestyle preferences, add rent split & room details, and the system shows matched people.",
            benefits: [
                "Find genuine roommates",
                "No random notices",
                "Lifestyle matching",
            ],
            color: "purple",
            details: [
                "Post 'Roommate Needed' listings",
                "Set lifestyle preferences",
                "Define rent split details",
                "Get matched automatically",
                "Chat with interested users",
            ],
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Based Compatibility Matching",
            description:
                "Smart AI algorithm matches users based on budget, location preference, personality traits, daily habits, college/office location, cleanliness level, and sleep schedule.",
            benefits: [
                "Compatibility percentage",
                "Smart suggestions",
                "Better living experience",
            ],
            color: "emerald",
            details: [
                "Budget matching",
                "Location preference",
                "Personality traits analysis",
                "Daily habits comparison",
                "Sleep schedule alignment",
            ],
        },
        {
            icon: <MapPinned className="w-8 h-8" />,
            title: "Smart Area-Based Search",
            description:
                "Search by area, budget, living type (single/shared), and gender preference. Perfect for targeting university and office zones with verified nearby rentals.",
            benefits: [
                "Targeted search",
                "Filter by preferences",
                "Find nearby options",
            ],
            color: "amber",
            details: [
                "Area-based filtering",
                "Budget range selection",
                "Living type preference",
                "Gender preference option",
                "University/Office zone targeting",
            ],
        },
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: "In-App Messaging + Visit Scheduling",
            description:
                "Secure chat system that avoids sharing phone numbers. Click 'Chat with Owner', send messages instantly, schedule visits, and get owner confirmations.",
            benefits: [
                "Privacy protected",
                "Instant messaging",
                "Easy scheduling",
            ],
            color: "rose",
            details: [
                "Secure in-app chat",
                "No phone number sharing",
                "Visit scheduling",
                "Owner confirmation system",
                "Message history",
            ],
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "3-Level Verification System",
            description:
                "Comprehensive verification including NID/Student ID upload, phone & email verification, and address & occupation proof. Users get Verified, Partially Verified, or Not Verified badges.",
            benefits: ["Safety ensured", "Trust badges", "Fraud prevention"],
            color: "cyan",
            details: [
                "NID / Student ID upload",
                "Phone verification",
                "Email verification",
                "Address proof",
                "Occupation verification",
            ],
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Review & Rating System",
            description:
                "Users can rate landlords, rooms, tenants, and roommates. Helps maintain transparency and prevents fraud through community feedback.",
            benefits: [
                "Community feedback",
                "Transparency",
                "Quality assurance",
            ],
            color: "yellow",
            details: [
                "Rate landlords",
                "Rate rooms",
                "Rate tenants",
                "Rate roommates",
                "Written reviews",
            ],
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Emergency Room Finder",
            description:
                "For students or job seekers who need instant accommodation. Select 'Emergency Room Needed', system shows urgent available rooms, and contact owner instantly.",
            benefits: [
                "Instant results",
                "Urgent availability",
                "Quick booking",
            ],
            color: "red",
            details: [
                "Emergency room tag",
                "Instant availability",
                "Quick contact",
                "Priority listing",
                "Fast response guarantee",
            ],
        },
    ];

    // Stats
    const stats = [
        {
            value: "10K+",
            label: "Active Listings",
            icon: <Building className="w-5 h-5" />,
            suffix: "",
        },
        {
            value: "50K+",
            label: "Happy Users",
            icon: <Users className="w-5 h-5" />,
            suffix: "",
        },
        {
            value: "100+",
            label: "Cities Covered",
            icon: <Globe className="w-5 h-5" />,
            suffix: "",
        },
        {
            value: "4.9",
            label: "User Rating",
            icon: <Star className="w-5 h-5" />,
            suffix: "/5",
        },
        {
            value: "98%",
            label: "Verified Listings",
            icon: <ShieldCheck className="w-5 h-5" />,
            suffix: "",
        },
        {
            value: "24/7",
            label: "Support Available",
            icon: <Headphones className="w-5 h-5" />,
            suffix: "",
        },
    ];

    // Testimonials
    const testimonials = [
        {
            quote: "As a university student, finding affordable accommodation was a nightmare. StayMate's AI matching helped me find the perfect roommate who shares my study schedule and lifestyle. We've been living together for 6 months now!",
            author: "Rahman Ahmed",
            role: "University Student",
            location: "Dhaka, Bangladesh",
            avatar: "RA",
            rating: 5,
            verified: true,
        },
        {
            quote: "I was skeptical about online room finding platforms after being scammed before. StayMate's 3-level verification gave me confidence. The landlord was verified, the room was exactly as shown, and the whole process was transparent.",
            author: "Fatima Khatun",
            role: "Job Seeker",
            location: "Chittagong, Bangladesh",
            avatar: "FK",
            rating: 5,
            verified: true,
        },
        {
            quote: "As a property owner, I've struggled with finding reliable tenants. StayMate's verification system and review system has helped me find trustworthy tenants. The in-app messaging makes communication so easy!",
            author: "Mohammad Karim",
            role: "Property Owner",
            location: "Sylhet, Bangladesh",
            avatar: "MK",
            rating: 5,
            verified: true,
        },
        {
            quote: "The emergency room finder feature was a lifesaver! I had to relocate for a new job with just 3 days notice. Found a verified room near my office within hours. Highly recommend for anyone in urgent need!",
            author: "Nusrat Jahan",
            role: "Software Developer",
            location: "Dhaka, Bangladesh",
            avatar: "NJ",
            rating: 5,
            verified: true,
        },
        {
            quote: "What sets StayMate apart is the roommate compatibility matching. It considers everything from sleep schedules to cleanliness preferences. My roommate and I get along perfectly because we were matched on these criteria.",
            author: "Tanvir Hassan",
            role: "Graduate Student",
            location: "Rajshahi, Bangladesh",
            avatar: "TH",
            rating: 5,
            verified: true,
        },
        {
            quote: "I've used many platforms to find tenants but StayMate is the best. The detailed listing options, verification badges, and the rating system help me attract quality tenants. My properties are always occupied!",
            author: "Salma Begum",
            role: "Real Estate Investor",
            location: "Dhaka, Bangladesh",
            avatar: "SB",
            rating: 5,
            verified: true,
        },
    ];

    // How It Works - Detailed Steps
    const howItWorks = [
        {
            step: "01",
            title: "Create Your Profile",
            description:
                "Sign up in seconds with email or phone. Complete your profile with preferences, lifestyle details, and verification documents for maximum trust.",
            icon: <Users className="w-8 h-8" />,
            details: [
                "Quick registration",
                "Add preferences",
                "Upload verification docs",
                "Set your budget",
            ],
        },
        {
            step: "02",
            title: "Search or Post Listings",
            description:
                "Browse verified rental listings or post your own. Use smart filters to find exactly what you need - by location, price, amenities, or roommate preferences.",
            icon: <Search className="w-8 h-8" />,
            details: [
                "Smart search filters",
                "Post your listing",
                "AI recommendations",
                "Save favorites",
            ],
        },
        {
            step: "03",
            title: "Connect & Communicate",
            description:
                "Found something interesting? Use our secure in-app messaging to connect with owners or potential roommates. Schedule visits directly through the platform.",
            icon: <MessageCircle className="w-8 h-8" />,
            details: [
                "Secure messaging",
                "Schedule visits",
                "Ask questions",
                "Negotiate terms",
            ],
        },
        {
            step: "04",
            title: "Verify & Review",
            description:
                "Check verification badges, read reviews from previous tenants or landlords. Make informed decisions based on community feedback and trust scores.",
            icon: <ShieldCheck className="w-8 h-8" />,
            details: [
                "Check badges",
                "Read reviews",
                "Verify identity",
                "Build trust",
            ],
        },
        {
            step: "05",
            title: "Move In & Rate",
            description:
                "Found your perfect match? Complete the process, move into your new home, and leave a review to help the community. Your feedback matters!",
            icon: <Home className="w-8 h-8" />,
            details: [
                "Finalize agreement",
                "Move in",
                "Leave review",
                "Help community",
            ],
        },
    ];

    // Comparison - Why StayMate vs Others
    const comparisonFeatures = [
        { feature: "Verified Listings", staymate: true, others: false },
        { feature: "AI Roommate Matching", staymate: true, others: false },
        { feature: "3-Level Verification", staymate: true, others: false },
        { feature: "In-App Messaging", staymate: true, others: "Limited" },
        { feature: "Emergency Room Finder", staymate: true, others: false },
        { feature: "Review & Rating System", staymate: true, others: "Basic" },
        { feature: "Lifestyle-Based Matching", staymate: true, others: false },
        { feature: "Long-Term Stay Focus", staymate: true, others: false },
        { feature: "Student-Friendly Pricing", staymate: true, others: false },
        { feature: "24/7 Support", staymate: true, others: "Limited" },
    ];

    // User Types
    const userTypes = [
        {
            icon: <GraduationCap className="w-10 h-10" />,
            title: "Students",
            description:
                "Find affordable rooms near your university, compatible roommates who understand your study schedule, and verified safe accommodations.",
            benefits: [
                "Budget-friendly options",
                "Near campus locations",
                "Compatible roommates",
                "Student ID verification",
            ],
            color: "primary",
        },
        {
            icon: <Briefcase className="w-10 h-10" />,
            title: "Job Seekers",
            description:
                "Relocating for a new job? Find rooms near your workplace quickly with our emergency room finder and area-based search features.",
            benefits: [
                "Office zone search",
                "Quick availability",
                "Emergency finder",
                "Professional verification",
            ],
            color: "emerald",
        },
        {
            icon: <Building2 className="w-10 h-10" />,
            title: "Landlords",
            description:
                "List your properties with complete details, get verified tenant applications, and manage everything through our intuitive dashboard.",
            benefits: [
                "Verified tenants",
                "Easy listing management",
                "Secure payments",
                "Review system",
            ],
            color: "purple",
        },
        {
            icon: <UsersRound className="w-10 h-10" />,
            title: "Roommate Seekers",
            description:
                "Already have a place but need a roommate? Post your requirements and let our AI match you with compatible people.",
            benefits: [
                "AI compatibility matching",
                "Lifestyle preferences",
                "Split rent calculation",
                "Chat before meeting",
            ],
            color: "amber",
        },
    ];

    // Amenities Filter Options
    const amenities = [
        { icon: <Wifi className="w-5 h-5" />, label: "High-Speed WiFi" },
        { icon: <Car className="w-5 h-5" />, label: "Parking Space" },
        { icon: <Coffee className="w-5 h-5" />, label: "Near Cafes" },
        { icon: <TreePine className="w-5 h-5" />, label: "Garden Access" },
        { icon: <Dumbbell className="w-5 h-5" />, label: "Gym Nearby" },
        { icon: <Lock className="w-5 h-5" />, label: "24/7 Security" },
        { icon: <Bed className="w-5 h-5" />, label: "Furnished" },
        { icon: <Zap className="w-5 h-5" />, label: "Power Backup" },
    ];

    // FAQ Data
    const faqs = [
        {
            question: "How does StayMate verify listings and users?",
            answer: "StayMate uses a comprehensive 3-level verification system. Users can verify their identity through NID/Student ID upload, phone & email verification, and address & occupation proof. Listings are verified through property documents and owner identity checks. Users receive badges: Verified, Partially Verified, or Not Verified based on their verification level.",
        },
        {
            question: "How does the AI roommate matching work?",
            answer: "Our AI algorithm analyzes multiple factors including budget preferences, location requirements, personality traits, daily habits (like sleep schedule, cleanliness levels), and lifestyle choices. It then calculates a compatibility percentage and suggests potential roommates who match your criteria. This helps ensure you find someone you can actually live with harmoniously.",
        },
        {
            question: "Is StayMate free to use?",
            answer: "StayMate offers a free tier for basic features including browsing listings, creating a profile, and basic messaging. Premium features like priority listing placement, advanced AI matching, and emergency room finder may require a subscription. We're committed to keeping core features accessible, especially for students and job seekers.",
        },
        {
            question: "How is StayMate different from Airbnb?",
            answer: "While Airbnb focuses on short-term vacation rentals, StayMate is specifically designed for long-term stays (1-12+ months). We focus on verified, budget-friendly shared-living options, lifestyle-based roommate matching, and cater specifically to students and job seekers who need affordable, safe, long-term accommodation.",
        },
        {
            question: "What if I need a room urgently?",
            answer: "We have an 'Emergency Room Finder' feature specifically for this! When you select 'Emergency Room Needed', the system prioritizes showing you rooms that are immediately available and owners who can respond quickly. Many users have found accommodation within hours using this feature.",
        },
        {
            question: "How does the review system work?",
            answer: "After your stay or rental experience, you can rate and review landlords, rooms, tenants, and roommates. Reviews include star ratings and written feedback. This helps maintain transparency, prevents fraud, and helps future users make informed decisions. All reviews are from verified users only.",
        },
        {
            question: "Is my personal information safe?",
            answer: "Absolutely. We take privacy seriously. Your personal information is encrypted and stored securely. Our in-app messaging system means you never have to share your phone number until you're comfortable. Verification documents are only used for verification purposes and are handled with strict confidentiality.",
        },
        {
            question: "Can I list multiple properties?",
            answer: "Yes! Property owners can list multiple properties through a single account. Our landlord dashboard provides easy management tools for all your listings, including analytics, tenant applications, and messaging - all in one place.",
        },
    ];

    // Trusted By / Press
    const trustedBy = [
        { name: "Featured Platform", icon: <Award className="w-6 h-6" /> },
        { name: "500+ 5-Star Reviews", icon: <Star className="w-6 h-6" /> },
        {
            name: "Verified & Secure",
            icon: <ShieldCheck className="w-6 h-6" />,
        },
        { name: "24/7 Support", icon: <Headphones className="w-6 h-6" /> },
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<
            string,
            { bg: string; text: string; border: string; gradient: string }
        > = {
            primary: {
                bg: isDark ? "bg-primary-500/20" : "bg-primary-100",
                text: isDark ? "text-primary-400" : "text-primary-600",
                border: isDark ? "border-primary-500/30" : "border-primary-200",
                gradient: "from-primary-500 to-primary-600",
            },
            purple: {
                bg: isDark ? "bg-purple-500/20" : "bg-purple-100",
                text: isDark ? "text-purple-400" : "text-purple-600",
                border: isDark ? "border-purple-500/30" : "border-purple-200",
                gradient: "from-purple-500 to-purple-600",
            },
            emerald: {
                bg: isDark ? "bg-emerald-500/20" : "bg-emerald-100",
                text: isDark ? "text-emerald-400" : "text-emerald-600",
                border: isDark ? "border-emerald-500/30" : "border-emerald-200",
                gradient: "from-emerald-500 to-emerald-600",
            },
            amber: {
                bg: isDark ? "bg-amber-500/20" : "bg-amber-100",
                text: isDark ? "text-amber-400" : "text-amber-600",
                border: isDark ? "border-amber-500/30" : "border-amber-200",
                gradient: "from-amber-500 to-amber-600",
            },
            rose: {
                bg: isDark ? "bg-rose-500/20" : "bg-rose-100",
                text: isDark ? "text-rose-400" : "text-rose-600",
                border: isDark ? "border-rose-500/30" : "border-rose-200",
                gradient: "from-rose-500 to-rose-600",
            },
            cyan: {
                bg: isDark ? "bg-cyan-500/20" : "bg-cyan-100",
                text: isDark ? "text-cyan-400" : "text-cyan-600",
                border: isDark ? "border-cyan-500/30" : "border-cyan-200",
                gradient: "from-cyan-500 to-cyan-600",
            },
            red: {
                bg: isDark ? "bg-red-500/20" : "bg-red-100",
                text: isDark ? "text-red-400" : "text-red-600",
                border: isDark ? "border-red-500/30" : "border-red-200",
                gradient: "from-red-500 to-red-600",
            },
            orange: {
                bg: isDark ? "bg-orange-500/20" : "bg-orange-100",
                text: isDark ? "text-orange-400" : "text-orange-600",
                border: isDark ? "border-orange-500/30" : "border-orange-200",
                gradient: "from-orange-500 to-orange-600",
            },
            yellow: {
                bg: isDark ? "bg-yellow-500/20" : "bg-yellow-100",
                text: isDark ? "text-yellow-400" : "text-yellow-600",
                border: isDark ? "border-yellow-500/30" : "border-yellow-200",
                gradient: "from-yellow-500 to-yellow-600",
            },
            blue: {
                bg: isDark ? "bg-blue-500/20" : "bg-blue-100",
                text: isDark ? "text-blue-400" : "text-blue-600",
                border: isDark ? "border-blue-500/30" : "border-blue-200",
                gradient: "from-blue-500 to-blue-600",
            },
        };
        return colors[color] || colors.primary;
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
                isDark
                    ? "bg-dark-950"
                    : "bg-gradient-to-br from-slate-50 via-white to-slate-50"
            }`}
        >
            {/* Subtle Grid Lines Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: isDark
                            ? `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`
                            : `linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <Navbar />

            {/* ============ HERO SECTION ============ */}
            <section className="relative h-screen flex flex-col justify-center overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 flex flex-col justify-center items-center pt-16">
                    {/* Trust Banner */}
                    <div className="flex justify-center mb-8 animate-fade-in-down">
                        <div
                            className={`inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full ${
                                isDark
                                    ? "bg-white/5 border border-white/10"
                                    : "bg-white/80 border border-gray-200 shadow-lg"
                            }`}
                        >
                            {trustedBy.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-2 text-xs sm:text-sm ${
                                        isDark
                                            ? "text-dark-300"
                                            : "text-dark-600"
                                    } ${idx !== 0 ? "sm:border-l sm:border-current/20 sm:pl-6" : ""}`}
                                >
                                    <span
                                        className={
                                            isDark
                                                ? "text-primary-400"
                                                : "text-primary-600"
                                        }
                                    >
                                        {item.icon}
                                    </span>
                                    <span className="hidden xs:inline sm:inline">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Hero Content */}
                    <div className="text-center max-w-5xl mx-auto w-full">
                        <h1
                            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            Smart Living{" "}
                            <span className="text-primary-500">
                                Starts Here
                            </span>
                        </h1>

                        <p
                            className={`text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${
                                isDark ? "text-dark-400" : "text-dark-600"
                            }`}
                        >
                            Find verified rental rooms, trusted landlords, and
                            compatible roommates—all in one place.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16">
                            <Link
                                href={
                                    isAuthenticated ? "/dashboard" : "/register"
                                }
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg font-semibold text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <button
                                className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-base md:text-lg font-semibold rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                                    isDark
                                        ? "border-dark-600 text-dark-300 hover:bg-dark-800 hover:border-dark-500"
                                        : "border-dark-200 text-dark-600 hover:bg-dark-50 hover:border-dark-300"
                                }`}
                            >
                                <Play className="w-5 h-5" />
                                Watch Demo
                            </button>
                        </div>

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 max-w-4xl mx-auto w-full">
                            {stats.slice(0, 4).map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div
                                        className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
                                            isDark
                                                ? "text-white"
                                                : "text-dark-900"
                                        }`}
                                    >
                                        {stat.value}
                                        <span className="text-primary-500">
                                            {stat.suffix}
                                        </span>
                                    </div>
                                    <div
                                        className={`text-sm md:text-base mt-1 ${isDark ? "text-dark-500" : "text-dark-500"}`}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
                    <span
                        className={`text-sm ${isDark ? "text-dark-500" : "text-dark-400"}`}
                    >
                        Scroll to explore
                    </span>
                    <ChevronDown
                        className={`w-5 h-5 ${isDark ? "text-dark-500" : "text-dark-400"}`}
                    />
                </div>
            </section>

            {/* ============ PROBLEM STATEMENT SECTION ============ */}
            <section
                className={`py-24 relative ${isDark ? "bg-dark-900/50" : "bg-gray-50"}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "bg-red-50 text-red-600 border border-red-100"
                            }`}
                        >
                            <AlertTriangle className="w-4 h-4" />
                            The Problem
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            Why Traditional Renting
                            <span className="text-red-500"> Doesn't Work</span>
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            Finding a suitable rental room or a compatible
                            roommate is one of the most challenging tasks for
                            students, job seekers, and newcomers in urban areas.
                            Traditional methods often lead to:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {problems.map((problem, idx) => {
                            const colors = getColorClasses(problem.color);
                            return (
                                <div
                                    key={idx}
                                    className={`group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                                        isDark
                                            ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                            : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
                                    }`}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${colors.bg} ${colors.text}`}
                                    >
                                        {problem.icon}
                                    </div>
                                    <h3
                                        className={`text-xl font-bold mb-3 ${
                                            isDark
                                                ? "text-white"
                                                : "text-dark-900"
                                        }`}
                                    >
                                        {problem.title}
                                    </h3>
                                    <p
                                        className={
                                            isDark
                                                ? "text-dark-300"
                                                : "text-dark-600"
                                        }
                                    >
                                        {problem.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Impact Stats */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            className={`text-center p-8 rounded-2xl ${
                                isDark
                                    ? "bg-red-500/10 border border-red-500/20"
                                    : "bg-red-50 border border-red-100"
                            }`}
                        >
                            <CircleDollarSign
                                className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-red-400" : "text-red-600"}`}
                            />
                            <h4
                                className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-dark-900"}`}
                            >
                                Financial Losses
                            </h4>
                            <p
                                className={
                                    isDark ? "text-dark-300" : "text-dark-600"
                                }
                            >
                                Scams and hidden fees cost renters thousands in
                                lost deposits and unexpected charges
                            </p>
                        </div>
                        <div
                            className={`text-center p-8 rounded-2xl ${
                                isDark
                                    ? "bg-orange-500/10 border border-orange-500/20"
                                    : "bg-orange-50 border border-orange-100"
                            }`}
                        >
                            <Shield
                                className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-orange-400" : "text-orange-600"}`}
                            />
                            <h4
                                className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-dark-900"}`}
                            >
                                Safety Threats
                            </h4>
                            <p
                                className={
                                    isDark ? "text-dark-300" : "text-dark-600"
                                }
                            >
                                Unverified landlords and tenants create serious
                                safety and security concerns
                            </p>
                        </div>
                        <div
                            className={`text-center p-8 rounded-2xl ${
                                isDark
                                    ? "bg-purple-500/10 border border-purple-500/20"
                                    : "bg-purple-50 border border-purple-100"
                            }`}
                        >
                            <Users
                                className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                            />
                            <h4
                                className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-dark-900"}`}
                            >
                                Stressful Living
                            </h4>
                            <p
                                className={
                                    isDark ? "text-dark-300" : "text-dark-600"
                                }
                            >
                                Incompatible roommates and poor living
                                conditions lead to constant stress
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SOLUTION SECTION ============ */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            The Solution
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            Introducing{" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    WebkitBackgroundClip: "text",
                                }}
                            >
                                StayMate
                            </span>
                        </h2>
                        <p
                            className={`text-xl ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            A dedicated platform where <strong>Tenants</strong>{" "}
                            can find rooms or roommates,{" "}
                            <strong>Landlords</strong> can post verified
                            rentals, <strong>Users</strong> get AI-based
                            compatibility matching, and{" "}
                            <strong>Everyone</strong> has access to verified
                            information.
                        </p>
                    </div>

                    {/* Core Focus Areas */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
                        {[
                            {
                                icon: <Clock className="w-6 h-6" />,
                                label: "Long-term Renting",
                                sublabel: "1-12+ months",
                            },
                            {
                                icon: <PiggyBank className="w-6 h-6" />,
                                label: "Budget-Friendly",
                                sublabel: "Shared rooms",
                            },
                            {
                                icon: <GraduationCap className="w-6 h-6" />,
                                label: "Student Friendly",
                                sublabel: "& Job seekers",
                            },
                            {
                                icon: <ShieldCheck className="w-6 h-6" />,
                                label: "Verified Listings",
                                sublabel: "Scam-free",
                            },
                            {
                                icon: <Heart className="w-6 h-6" />,
                                label: "Lifestyle Matching",
                                sublabel: "Compatible roommates",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                                    isDark
                                        ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                        : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
                                }`}
                            >
                                <div
                                    className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                                        isDark
                                            ? "bg-primary-500/20 text-primary-400"
                                            : "bg-primary-100 text-primary-600"
                                    }`}
                                >
                                    {item.icon}
                                </div>
                                <h4
                                    className={`font-semibold mb-1 ${isDark ? "text-white" : "text-dark-900"}`}
                                >
                                    {item.label}
                                </h4>
                                <p
                                    className={`text-sm ${isDark ? "text-dark-400" : "text-dark-500"}`}
                                >
                                    {item.sublabel}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* What Makes Us Different */}
                    <div
                        className={`p-8 rounded-3xl ${
                            isDark
                                ? "bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-white/10"
                                : "bg-gradient-to-br from-primary-50 to-purple-50 border border-primary-100"
                        }`}
                    >
                        <div className="text-center mb-8">
                            <h3
                                className={`text-2xl font-bold ${isDark ? "text-white" : "text-dark-900"}`}
                            >
                                Unlike Airbnb which focuses on short trips...
                            </h3>
                            <p
                                className={`mt-2 text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                            >
                                StayMate focuses on{" "}
                                <strong className="text-primary-500">
                                    long-term stays
                                </strong>{" "}
                                — designed specifically for{" "}
                                <strong className="text-purple-500">
                                    student budgets
                                </strong>{" "}
                                and{" "}
                                <strong className="text-emerald-500">
                                    roommate compatibility
                                </strong>
                                .
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div
                                className={`text-center p-6 rounded-2xl ${isDark ? "bg-white/5" : "bg-white"}`}
                            >
                                <div className="text-4xl font-bold text-primary-500 mb-2">
                                    1-12+
                                </div>
                                <div
                                    className={
                                        isDark
                                            ? "text-dark-300"
                                            : "text-dark-600"
                                    }
                                >
                                    Months Stay Duration
                                </div>
                            </div>
                            <div
                                className={`text-center p-6 rounded-2xl ${isDark ? "bg-white/5" : "bg-white"}`}
                            >
                                <div className="text-4xl font-bold text-purple-500 mb-2">
                                    50%
                                </div>
                                <div
                                    className={
                                        isDark
                                            ? "text-dark-300"
                                            : "text-dark-600"
                                    }
                                >
                                    Lower Than Market Rate
                                </div>
                            </div>
                            <div
                                className={`text-center p-6 rounded-2xl ${isDark ? "bg-white/5" : "bg-white"}`}
                            >
                                <div className="text-4xl font-bold text-emerald-500 mb-2">
                                    95%
                                </div>
                                <div
                                    className={
                                        isDark
                                            ? "text-dark-300"
                                            : "text-dark-600"
                                    }
                                >
                                    Roommate Compatibility
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ KEY FEATURES SECTION ============ */}
            <section
                className={`py-24 relative ${isDark ? "bg-dark-900/50" : "bg-gray-50"}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                                    : "bg-primary-50 text-primary-600 border border-primary-100"
                            }`}
                        >
                            <Zap className="w-4 h-4" />
                            Powerful Features
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            Everything You Need for
                            <span className="text-primary-500">
                                {" "}
                                Smart Living
                            </span>
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            StayMate comes packed with features designed to make
                            your rental experience safe, easy, and enjoyable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {coreFeatures.map((feature, idx) => {
                            const colors = getColorClasses(feature.color);
                            return (
                                <div
                                    key={idx}
                                    className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.02] flex flex-col h-full ${
                                        isDark
                                            ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                                            : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl"
                                    }`}
                                >
                                    {/* Feature Number Badge */}
                                    <div
                                        className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                                            isDark
                                                ? "bg-white/10 text-white"
                                                : "bg-gray-100 text-dark-600"
                                        }`}
                                    >
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 flex-grow">
                                        <div
                                            className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center ${colors.bg} ${colors.text}`}
                                        >
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <h3
                                                className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${
                                                    isDark
                                                        ? "text-white"
                                                        : "text-dark-900"
                                                }`}
                                            >
                                                {feature.title}
                                            </h3>
                                            <p
                                                className={`mb-4 text-sm sm:text-base ${isDark ? "text-dark-300" : "text-dark-600"}`}
                                            >
                                                {feature.description}
                                            </p>

                                            {/* Feature Details */}
                                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-4">
                                                {feature.details.map(
                                                    (detail, dIdx) => (
                                                        <div
                                                            key={dIdx}
                                                            className={`flex items-center gap-2 text-xs sm:text-sm ${
                                                                isDark
                                                                    ? "text-dark-400"
                                                                    : "text-dark-500"
                                                            }`}
                                                        >
                                                            <CheckCircle
                                                                className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${colors.text}`}
                                                            />
                                                            <span>
                                                                {detail}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>

                                            {/* Benefits Tags */}
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                                                {feature.benefits.map(
                                                    (benefit, bIdx) => (
                                                        <span
                                                            key={bIdx}
                                                            className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
                                                        >
                                                            {benefit}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ VERIFICATION SYSTEM SECTION ============ */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <span
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                    isDark
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                }`}
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Trust & Safety
                            </span>
                            <h2
                                className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                    isDark ? "text-white" : "text-dark-900"
                                }`}
                            >
                                3-Level Verification
                                <span className="text-emerald-500">
                                    {" "}
                                    System
                                </span>
                            </h2>
                            <p
                                className={`text-lg mb-8 ${isDark ? "text-dark-300" : "text-dark-600"}`}
                            >
                                Our comprehensive verification system ensures
                                safety and trust for everyone. Users and
                                landlords earn verification badges that build
                                credibility and help others make informed
                                decisions.
                            </p>

                            {/* Verification Levels */}
                            <div className="space-y-4">
                                {[
                                    {
                                        level: "Level 1",
                                        title: "Identity Verification",
                                        items: [
                                            "NID / Student ID upload",
                                            "Photo verification",
                                        ],
                                        icon: (
                                            <Fingerprint className="w-6 h-6" />
                                        ),
                                        color: "amber",
                                    },
                                    {
                                        level: "Level 2",
                                        title: "Contact Verification",
                                        items: [
                                            "Phone number verification",
                                            "Email verification",
                                        ],
                                        icon: <Phone className="w-6 h-6" />,
                                        color: "primary",
                                    },
                                    {
                                        level: "Level 3",
                                        title: "Background Verification",
                                        items: [
                                            "Address proof",
                                            "Occupation verification",
                                        ],
                                        icon: <FileCheck className="w-6 h-6" />,
                                        color: "emerald",
                                    },
                                ].map((level, idx) => {
                                    const colors = getColorClasses(level.color);
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                                                isDark
                                                    ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                                    : "bg-white border border-gray-200 shadow-md hover:shadow-lg"
                                            }`}
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}
                                            >
                                                {level.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className={`text-xs font-bold ${colors.text}`}
                                                    >
                                                        {level.level}
                                                    </span>
                                                    <h4
                                                        className={`font-semibold ${isDark ? "text-white" : "text-dark-900"}`}
                                                    >
                                                        {level.title}
                                                    </h4>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {level.items.map(
                                                        (item, iIdx) => (
                                                            <span
                                                                key={iIdx}
                                                                className={`text-sm ${isDark ? "text-dark-400" : "text-dark-500"}`}
                                                            >
                                                                • {item}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Verification Badges Visual */}
                        <div className="relative">
                            <div
                                className={`p-8 rounded-3xl ${
                                    isDark
                                        ? "bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10"
                                        : "bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100"
                                }`}
                            >
                                <h4
                                    className={`text-xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-dark-900"}`}
                                >
                                    Verification Badge Types
                                </h4>
                                <div className="space-y-4">
                                    {[
                                        {
                                            badge: "Verified",
                                            description:
                                                "All 3 levels completed",
                                            color: "emerald",
                                            icon: (
                                                <BadgeCheck className="w-8 h-8" />
                                            ),
                                        },
                                        {
                                            badge: "Partially Verified",
                                            description: "1-2 levels completed",
                                            color: "amber",
                                            icon: (
                                                <UserCheck className="w-8 h-8" />
                                            ),
                                        },
                                        {
                                            badge: "Not Verified",
                                            description: "Verification pending",
                                            color: "red",
                                            icon: (
                                                <AlertCircle className="w-8 h-8" />
                                            ),
                                        },
                                    ].map((item, idx) => {
                                        const colors = getColorClasses(
                                            item.color,
                                        );
                                        return (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-4 p-4 rounded-xl ${
                                                    isDark
                                                        ? "bg-white/5"
                                                        : "bg-white shadow-md"
                                                }`}
                                            >
                                                <div
                                                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}
                                                >
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h5
                                                        className={`font-bold ${colors.text}`}
                                                    >
                                                        {item.badge}
                                                    </h5>
                                                    <p
                                                        className={`text-sm ${isDark ? "text-dark-400" : "text-dark-500"}`}
                                                    >
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ WHO IS STAYMATE FOR SECTION ============ */}
            <section
                className={`py-24 relative ${isDark ? "bg-dark-900/50" : "bg-gray-50"}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    : "bg-purple-50 text-purple-600 border border-purple-100"
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            For Everyone
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            Who is StayMate
                            <span className="text-purple-500"> For?</span>
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            Whether you're a student, job seeker, landlord, or
                            looking for a roommate — StayMate has you covered.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {userTypes.map((userType, idx) => {
                            const colors = getColorClasses(userType.color);
                            return (
                                <div
                                    key={idx}
                                    className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.02] overflow-hidden flex flex-col h-full ${
                                        isDark
                                            ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                            : "bg-white border border-gray-200 shadow-xl hover:shadow-2xl"
                                    }`}
                                >
                                    {/* Background Gradient */}
                                    <div
                                        className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${colors.gradient}`}
                                    />

                                    <div className="relative z-10 flex flex-col flex-grow">
                                        <div
                                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ${colors.bg} ${colors.text}`}
                                        >
                                            {userType.icon}
                                        </div>
                                        <h3
                                            className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${isDark ? "text-white" : "text-dark-900"}`}
                                        >
                                            {userType.title}
                                        </h3>
                                        <p
                                            className={`mb-4 sm:mb-6 text-sm sm:text-base ${isDark ? "text-dark-300" : "text-dark-600"}`}
                                        >
                                            {userType.description}
                                        </p>
                                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mt-auto">
                                            {userType.benefits.map(
                                                (benefit, bIdx) => (
                                                    <div
                                                        key={bIdx}
                                                        className={`flex items-center gap-2 text-xs sm:text-sm ${isDark ? "text-dark-400" : "text-dark-500"}`}
                                                    >
                                                        <CheckCircle
                                                            className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${colors.text}`}
                                                        />
                                                        <span>{benefit}</span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ HOW IT WORKS SECTION ============ */}
            <section className="py-24 relative" id="how-it-works">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                                    : "bg-primary-50 text-primary-600 border border-primary-100"
                            }`}
                        >
                            <Rocket className="w-4 h-4" />
                            Getting Started
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            How StayMate
                            <span className="text-primary-500"> Works</span>
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            Finding your perfect home or tenant is easier than
                            ever. Just follow these simple steps.
                        </p>
                    </div>

                    {/* Steps Timeline */}
                    <div className="relative">
                        {/* Connecting Line */}
                        <div
                            className={`hidden lg:block absolute top-[3.25rem] left-[10%] right-[10%] h-0.5 ${
                                isDark ? "bg-white/10" : "bg-gray-200"
                            }`}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
                            {howItWorks.map((step, idx) => (
                                <div key={idx} className="relative">
                                    {/* Step Number Circle */}
                                    <div
                                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-base lg:text-lg font-bold mx-auto mb-4 lg:mb-6 relative z-10 ${
                                            isDark
                                                ? "bg-primary-500 text-white"
                                                : "bg-primary-500 text-white"
                                        }`}
                                    >
                                        {step.step}
                                    </div>

                                    <div
                                        className={`text-center p-4 lg:p-6 rounded-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col ${
                                            isDark
                                                ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                                : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
                                        }`}
                                    >
                                        <div
                                            className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4 ${
                                                isDark
                                                    ? "bg-primary-500/20 text-primary-400"
                                                    : "bg-primary-100 text-primary-600"
                                            }`}
                                        >
                                            {step.icon}
                                        </div>
                                        <h4
                                            className={`text-base lg:text-lg font-bold mb-2 ${isDark ? "text-white" : "text-dark-900"}`}
                                        >
                                            {step.title}
                                        </h4>
                                        <p
                                            className={`text-xs lg:text-sm mb-4 flex-grow ${isDark ? "text-dark-400" : "text-dark-500"}`}
                                        >
                                            {step.description}
                                        </p>
                                        <div className="space-y-1 mt-auto">
                                            {step.details.map(
                                                (detail, dIdx) => (
                                                    <div
                                                        key={dIdx}
                                                        className={`text-xs flex items-center justify-center gap-1 ${
                                                            isDark
                                                                ? "text-dark-500"
                                                                : "text-dark-400"
                                                        }`}
                                                    >
                                                        <CheckCircle className="w-3 h-3 text-primary-500" />
                                                        {detail}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ COMPARISON SECTION ============ */}
            <section
                className={`py-24 relative ${isDark ? "bg-dark-900/50" : "bg-gray-50"}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                    : "bg-cyan-50 text-cyan-600 border border-cyan-100"
                            }`}
                        >
                            <Target className="w-4 h-4" />
                            Why Choose Us
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            StayMate vs
                            <span className="text-cyan-500"> Others</span>
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            See how StayMate compares to traditional rental
                            platforms and methods.
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <div
                        className={`rounded-3xl overflow-hidden ${
                            isDark
                                ? "bg-white/5 border border-white/10"
                                : "bg-white border border-gray-200 shadow-2xl"
                        }`}
                    >
                        {/* Header */}
                        <div
                            className={`grid grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-6 ${
                                isDark ? "bg-white/5" : "bg-gray-50"
                            }`}
                        >
                            <div
                                className={`font-bold text-sm sm:text-base ${isDark ? "text-white" : "text-dark-900"}`}
                            >
                                Feature
                            </div>
                            <div className="text-center">
                                <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 text-white font-bold text-xs sm:text-sm">
                                    <Logo size="sm" linkTo="" />
                                    <span className="hidden sm:inline">
                                        StayMate
                                    </span>
                                </span>
                            </div>
                            <div
                                className={`text-center font-bold text-sm sm:text-base ${isDark ? "text-dark-400" : "text-dark-500"}`}
                            >
                                Others
                            </div>
                        </div>

                        {/* Rows */}
                        <div
                            className={`divide-y ${isDark ? "divide-white/10" : "divide-gray-100"}`}
                        >
                            {comparisonFeatures.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 items-center transition-colors ${
                                        isDark
                                            ? "hover:bg-white/5"
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <div
                                        className={`text-xs sm:text-sm ${
                                            isDark
                                                ? "text-dark-300"
                                                : "text-dark-600"
                                        }`}
                                    >
                                        {item.feature}
                                    </div>
                                    <div className="text-center">
                                        {item.staymate === true ? (
                                            <CircleCheck className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-emerald-500" />
                                        ) : (
                                            <span className="text-emerald-500 font-medium text-xs sm:text-sm">
                                                {item.staymate}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        {item.others === false ? (
                                            <CircleX className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-red-500" />
                                        ) : (
                                            <span
                                                className={`text-xs sm:text-sm ${isDark ? "text-dark-400" : "text-dark-500"}`}
                                            >
                                                {item.others}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ TESTIMONIALS SECTION ============ */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                    : "bg-rose-50 text-rose-600 border border-rose-100"
                            }`}
                        >
                            <Heart className="w-4 h-4" />
                            Loved by Users
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            What Our Users
                            <span className="text-rose-500"> Say</span>
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            Real stories from real users who found their perfect
                            accommodation through StayMate.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.02] flex flex-col h-full ${
                                    isDark
                                        ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                        : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl"
                                }`}
                            >
                                {/* Quote Icon */}
                                <Quote
                                    className={`w-10 h-10 mb-4 ${isDark ? "text-primary-400/30" : "text-primary-200"}`}
                                />

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({
                                        length: testimonial.rating,
                                    }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 text-amber-400 fill-amber-400"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p
                                    className={`mb-6 leading-relaxed flex-grow ${isDark ? "text-dark-300" : "text-dark-600"}`}
                                >
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4 mt-auto">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                                            isDark
                                                ? "bg-gradient-to-br from-primary-500 to-purple-500 text-white"
                                                : "bg-primary-100 text-primary-600"
                                        }`}
                                    >
                                        {testimonial.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p
                                                className={`font-semibold ${isDark ? "text-white" : "text-dark-900"}`}
                                            >
                                                {testimonial.author}
                                            </p>
                                            {testimonial.verified && (
                                                <BadgeCheck className="w-4 h-4 text-primary-500" />
                                            )}
                                        </div>
                                        <p
                                            className={`text-sm ${isDark ? "text-dark-400" : "text-dark-500"}`}
                                        >
                                            {testimonial.role} •{" "}
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ FAQ SECTION ============ */}
            <section
                className={`py-24 relative ${isDark ? "bg-dark-900/50" : "bg-gray-50"}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                                isDark
                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    : "bg-amber-50 text-amber-600 border border-amber-100"
                            }`}
                        >
                            <HelpCircle className="w-4 h-4" />
                            Have Questions?
                        </span>
                        <h2
                            className={`text-4xl sm:text-5xl font-bold mb-6 ${
                                isDark ? "text-white" : "text-dark-900"
                            }`}
                        >
                            Frequently Asked
                            <span className="text-amber-500"> Questions</span>
                        </h2>
                        <p
                            className={`text-lg ${isDark ? "text-dark-300" : "text-dark-600"}`}
                        >
                            Everything you need to know about StayMate. Can't
                            find what you're looking for? Contact our support
                            team.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                                    isDark
                                        ? "bg-white/5 border border-white/10"
                                        : "bg-white border border-gray-200 shadow-md"
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        setOpenFaq(openFaq === idx ? null : idx)
                                    }
                                    className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
                                        isDark
                                            ? "hover:bg-white/5"
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <h4
                                        className={`font-semibold pr-4 ${isDark ? "text-white" : "text-dark-900"}`}
                                    >
                                        {faq.question}
                                    </h4>
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            openFaq === idx
                                                ? isDark
                                                    ? "bg-primary-500 text-white rotate-180"
                                                    : "bg-primary-500 text-white rotate-180"
                                                : isDark
                                                  ? "bg-white/10 text-white"
                                                  : "bg-gray-100 text-dark-500"
                                        }`}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openFaq === idx ? "max-h-96" : "max-h-0"
                                    }`}
                                >
                                    <p
                                        className={`px-6 pb-6 ${isDark ? "text-dark-300" : "text-dark-600"}`}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CTA SECTION ============ */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div
                        className={`relative p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-[3rem] overflow-hidden ${
                            isDark
                                ? "bg-dark-900 border border-white/10"
                                : "bg-slate-900"
                        }`}
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10 text-center">
                            <div
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 bg-white/10 text-slate-300 border border-white/10`}
                            >
                                <Sparkles className="w-4 h-4" />
                                Start Your Journey Today
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                                Find Your Perfect
                                <span className="hidden sm:inline">
                                    <br />
                                </span>{" "}
                                Room. Find Your Perfect
                                <span className="hidden sm:inline">
                                    <br />
                                </span>{" "}
                                <span className="text-slate-400">Mate.</span>
                            </h2>

                            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto px-2 sm:px-0 text-slate-400">
                                Join thousands of students and job seekers who
                                found their ideal accommodation through
                                StayMate. Your smart solution to smart living.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                                <Link
                                    href="/register"
                                    className="group relative inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 bg-white text-slate-900 hover:bg-slate-100 shadow-lg w-full sm:w-auto justify-center"
                                >
                                    <span className="relative z-10">
                                        Get Started Free
                                    </span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/login"
                                    className="font-medium text-sm sm:text-lg transition-colors text-slate-400 hover:text-white"
                                >
                                    Already have an account? Sign in →
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">
                                {[
                                    {
                                        icon: <Shield className="w-5 h-5" />,
                                        label: "100% Verified",
                                    },
                                    {
                                        icon: <Lock className="w-5 h-5" />,
                                        label: "Secure Platform",
                                    },
                                    {
                                        icon: (
                                            <Headphones className="w-5 h-5" />
                                        ),
                                        label: "24/7 Support",
                                    },
                                ].map((badge, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 text-slate-500"
                                    >
                                        {badge.icon}
                                        <span className="text-sm font-medium">
                                            {badge.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ FOOTER ============ */}
            <footer
                className={`py-16 border-t ${
                    isDark
                        ? "bg-dark-950 border-white/10"
                        : "bg-white border-gray-200"
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Footer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                        {/* Brand */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                            <Logo size="md" linkTo="/" animated={false} />
                            <p
                                className={`mt-4 text-sm max-w-xs ${isDark ? "text-dark-400" : "text-dark-600"}`}
                            >
                                StayMate — Your smart solution to smart living.
                                Find verified rental rooms, trusted landlords,
                                compatible roommates, and affordable
                                shared-living options.
                            </p>
                            {/* Social Links */}
                            <div className="flex items-center justify-start gap-3 sm:gap-4 mt-6">
                                {[
                                    "Facebook",
                                    "Twitter",
                                    "Instagram",
                                    "LinkedIn",
                                ].map((social, idx) => (
                                    <Link
                                        key={idx}
                                        href={`https://${social.toLowerCase()}.com`}
                                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                                            isDark
                                                ? "bg-white/5 text-dark-400 hover:bg-white/10 hover:text-white"
                                                : "bg-gray-100 text-dark-500 hover:bg-primary-100 hover:text-primary-600"
                                        }`}
                                    >
                                        <Globe className="w-5 h-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {[
                            {
                                title: "Product",
                                links: [
                                    "Features",
                                    "Pricing",
                                    "How It Works",
                                    "Testimonials",
                                ],
                            },
                            {
                                title: "Company",
                                links: ["About Us", "Careers", "Blog", "Press"],
                            },
                            {
                                title: "Support",
                                links: [
                                    "Help Center",
                                    "Contact Us",
                                    "FAQ",
                                    "Community",
                                ],
                            },
                            {
                                title: "Legal",
                                links: [
                                    "Privacy Policy",
                                    "Terms of Service",
                                    "Cookie Policy",
                                    "Security",
                                ],
                            },
                        ].map((section, idx) => (
                            <div key={idx}>
                                <h4
                                    className={`font-semibold mb-4 ${isDark ? "text-white" : "text-dark-900"}`}
                                >
                                    {section.title}
                                </h4>
                                <ul className="space-y-2">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link
                                                href="#"
                                                className={`text-sm transition-colors ${
                                                    isDark
                                                        ? "text-dark-400 hover:text-white"
                                                        : "text-dark-500 hover:text-dark-900"
                                                }`}
                                            >
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div
                        className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${
                            isDark ? "border-white/10" : "border-gray-200"
                        }`}
                    >
                        <p
                            className={`text-sm ${isDark ? "text-dark-500" : "text-dark-500"}`}
                        >
                            © 2024 StayMate. All rights reserved. Your smart
                            solution to smart living.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="#"
                                className={`text-sm transition-colors ${
                                    isDark
                                        ? "text-dark-400 hover:text-white"
                                        : "text-dark-500 hover:text-dark-900"
                                }`}
                            >
                                Privacy
                            </Link>
                            <Link
                                href="#"
                                className={`text-sm transition-colors ${
                                    isDark
                                        ? "text-dark-400 hover:text-white"
                                        : "text-dark-500 hover:text-dark-900"
                                }`}
                            >
                                Terms
                            </Link>
                            <Link
                                href="#"
                                className={`text-sm transition-colors ${
                                    isDark
                                        ? "text-dark-400 hover:text-white"
                                        : "text-dark-500 hover:text-dark-900"
                                }`}
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
