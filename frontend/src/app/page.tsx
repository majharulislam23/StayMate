import FluidGradient from '@/components/cinematic/FluidGradient'
import AppShowcase from '@/components/landing/AppShowcase'
import CallToAction from '@/components/landing/CallToAction'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import ProblemSolution from '@/components/landing/ProblemSolution'
import ScrollFeatures from '@/components/landing/ScrollFeatures'
import Testimonials from '@/components/landing/Testimonials'
import TrustSignals from '@/components/landing/TrustSignals'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-electric-500/30 selection:text-white">
      {/* 1. Global Background */}
      <FluidGradient />

      {/* 2. Navigation (Simplified for landing) */}
      <nav className="fixed top-0 inset-x-0 z-[100] p-6 flex justify-between items-center backdrop-blur-md bg-white/50 dark:bg-black/50 border-b border-white/10">
        <span className="font-display font-bold tracking-tighter text-2xl text-stone-900 dark:text-white">STAYMATE.</span>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <div className="w-[1px] h-6 bg-stone-200 dark:bg-white/10 mx-2 hidden sm:block"></div>
          <a href="/login" className="px-5 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">Log In</a>
          <a href="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-stone-900 dark:bg-white dark:text-black rounded-full hover:scale-105 transition-transform">Get Started</a>
        </div>
      </nav>

      {/* 3. Sections Assembly */}
      <div className="relative z-10 flex flex-col bg-white dark:bg-black">
        <Hero />
        <TrustSignals />
        <ProblemSolution />
        <ScrollFeatures />
        <HowItWorks />
        <AppShowcase />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>

    </main>
  )
}
