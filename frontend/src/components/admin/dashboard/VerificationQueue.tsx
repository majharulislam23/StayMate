import { VerificationStats } from "@/types/auth"
import { CheckCircle2, Clock, UserCheck } from "lucide-react"

interface VerificationQueueProps {
 stats: VerificationStats
}

export const VerificationQueue = ({ stats }: VerificationQueueProps) => {
 return (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
   <div className="p-5 border-b border-slate-100 dark:border-slate-700">
    <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
     <UserCheck className="w-5 h-5 text-indigo-500" />
     Verification Queue
    </h3>
   </div>

   <div className="p-5 grid grid-cols-2 gap-4">
    <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
     <div className="text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-2 text-sm font-medium">
      <Clock className="w-4 h-4" /> Pending IDs
     </div>
     <div className="text-3xl font-bold text-slate-900 dark:text-white">
      {stats.pendingIdentity}
     </div>
     <div className="mt-2 text-xs text-indigo-600/70 dark:text-indigo-400/70">
      Requires manual review
     </div>
    </div>

    <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
     <div className="text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-2 text-sm font-medium">
      <CheckCircle2 className="w-4 h-4" /> Pending Props
     </div>
     <div className="text-3xl font-bold text-slate-900 dark:text-white">
      {stats.pendingProperty}
     </div>
     <div className="mt-2 text-xs text-emerald-600/70 dark:text-emerald-400/70">
      Listings awaiting approval
     </div>
    </div>
   </div>

   <div className="p-4 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700 flex justify-center">
    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition">
     Process Queue &rarr;
    </button>
   </div>
  </div>
 )
}
