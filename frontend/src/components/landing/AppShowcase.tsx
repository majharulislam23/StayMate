"use client"

import { motion } from "framer-motion"

// Mock Images for the carousel
const images = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop", // Elegant Living Room
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop", // Modern Kitchen
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop", // Cozy Bedroom
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2532&auto=format&fit=crop", // Minimalist Home
]

export default function AppShowcase() {
  return (
    <section className="py-32 bg-stone-50 dark:bg-black text-stone-900 dark:text-white overflow-hidden transition-colors duration-500">
      <div className="container-cinema mx-auto px-6 mb-16 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
          Designed for <span className="text-electric-500">modern living.</span>
        </h2>
        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
          A seamless experience on web and mobile. Browse beautiful stays in high-resolution detail.
        </p>
      </div>

      {/* Infinite Scroll / Marquee Horizontal */}
      <div className="relative w-full overflow-hidden py-10">
        <div className="flex">
          {/* Framer Motion Infinite Loop */}
          <motion.div
            className="flex gap-8 px-4"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {/* Duplicating array multiple times to ensure seamless loop */}
            {[...images, ...images, ...images, ...images].map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="relative flex-shrink-0 w-[300px] md:w-[500px] aspect-[4/3] rounded-3xl overflow-hidden border-[6px] border-white dark:border-stone-800 shadow-xl shadow-stone-200/50 dark:shadow-none cursor-pointer bg-stone-200 dark:bg-stone-800"
              >
                <img
                  src={src}
                  alt="App Screenshot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-lg font-bold">Luxury Penthouse</div>
                    <div className="text-sm text-stone-300">$2,400/mo • New York</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Fade overlay edges - Adapted for Light/Dark */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-50 via-stone-50/80 dark:from-black dark:via-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-50 via-stone-50/80 dark:from-black dark:via-black/80 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
