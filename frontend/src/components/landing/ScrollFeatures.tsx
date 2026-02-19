"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Home, Search, ShieldCheck, SlidersHorizontal, Zap } from "lucide-react"
import { useRef } from "react"

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Discover",
    copy: "Search verified homes across cities tailored to your lifestyle and budget.",
  },
  {
    id: 2,
    icon: SlidersHorizontal,
    title: "Compare",
    copy: "Compare prices, amenities, locations, and real reviews — no hidden surprises.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Verify",
    copy: "Every stay is verified for safety, accuracy, and reliability.",
  },
  {
    id: 4,
    icon: Zap,
    title: "Book Instantly",
    copy: "Book instantly with transparent pricing and secure payments.",
  },
  {
    id: 5,
    icon: Home,
    title: "Move In Confidently",
    copy: "Arrive knowing your stay is ready — no stress, no last-minute chaos.",
  },
]

export default function ScrollFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <section ref={containerRef} className="relative bg-stone-50 dark:bg-black">

      {/* Sticky Header */}
      <div className="sticky top-0 z-20 pt-10 pb-6 bg-stone-50/90 dark:bg-black/90 backdrop-blur-md border-b border-stone-200/50 dark:border-white/5 mb-10">
        <div className="container-cinema mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-stone-900 dark:text-white mb-2">
            Everything you need to find home.
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            From search to move-in — guided, verified, effortless.
          </p>
        </div>
      </div>

      <div className="container-cinema mx-auto px-6 relative pb-40">

        {/* Vertical Line Container */}
        <div className="absolute left-[2rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-stone-200 dark:bg-stone-800 -translate-x-1/2 md:translate-x-0">
          {/* Active Fill Line */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-electric-500 to-lux-indigo w-full origin-top"
            style={{ height: "100%", scaleY: scrollYProgress }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-40 md:space-y-60 pt-20">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  // Alternate sides on desktop
  const isRight = index % 2 !== 0

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`relative flex items-center md:justify-between ${isRight ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Desktop Spacer for alternating layout */}
      <div className="hidden md:block w-5/12" />

      {/* Center Node (Icon) */}
      <div className="absolute left-[2rem] md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-stone-100 dark:bg-stone-900 border-4 border-white dark:border-black shadow-xl flex items-center justify-center z-10">
          <step.icon className="w-5 h-5 md:w-8 md:h-8 text-stone-900 dark:text-white" />
        </div>
      </div>

      {/* Content Card */}
      <div className={`pl-20 md:pl-0 w-full md:w-5/12 ${isRight ? 'md:text-right' : 'md:text-left'}`}>
        <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/50 border border-stone-200 dark:border-white/10 shadow-glass dark:shadow-none hover:shadow-xl transition-shadow duration-500">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">{step.title}</h3>
          <p className="text-stone-600 dark:text-stone-400">{step.copy}</p>
        </div>
      </div>

    </motion.div>
  )
}
