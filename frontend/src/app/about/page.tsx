"use client"

import PublicPageLayout from "@/components/PublicPageLayout"
import { useTheme } from "@/context/ThemeContext"

export default function AboutPage() {
 const { isDark } = useTheme()

 return (
  <PublicPageLayout
   title="About StayMate"
   subtitle="We're on a mission to modernize and simplify the rental experience in Bangladesh."
  >
   <div className={`space-y-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
    <section>
     <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Our Story</h2>
     <p className="leading-relaxed">
      StayMate started with a simple observation: finding a safe, affordable place to live in Dhaka is incredibly difficult.
      Scams, lack of transparency, and incompatible roommates make the process stressful for students and professionals alike.
      We built StayMate to solve this by creating a trusted community where verification and compatibility come first.
     </p>
    </section>

    <section>
     <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>Our Values</h2>
     <ul className="grid sm:grid-cols-2 gap-6 mt-6">
      <li className="flex gap-3">
       <span className="text-primary-500 font-bold">•</span>
       <span>Trust & Transparency</span>
      </li>
      <li className="flex gap-3">
       <span className="text-primary-500 font-bold">•</span>
       <span>Safety First</span>
      </li>
      <li className="flex gap-3">
       <span className="text-primary-500 font-bold">•</span>
       <span>Community Driven</span>
      </li>
      <li className="flex gap-3">
       <span className="text-primary-500 font-bold">•</span>
       <span>Innovation</span>
      </li>
     </ul>
    </section>
   </div>
  </PublicPageLayout>
 )
}
