import { FraudEvent } from "@/types/auth"
import { AlertTriangle, Copy, MapPin, MessageSquare, ShieldAlert } from "lucide-react"

interface FraudMonitorProps {
 events: FraudEvent[]
 onTriggerScan: () => void
}

export const FraudMonitor = ({ events, onTriggerScan }: FraudMonitorProps) => {

 const getIcon = (type: string) => {
  switch (type) {
   case "DUPLICATE_LISTING": return <Copy className="w-4 h-4 text-orange-500" />
   case "SPAM_MESSAGES": return <MessageSquare className="w-4 h-4 text-blue-500" />
   case "FAKE_LOCATION": return <MapPin className="w-4 h-4 text-red-500" />
   default: return <AlertTriangle className="w-4 h-4 text-gray-500" />
  }
 }

 return (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col">
   <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
    <div className="flex items-center gap-2">
     <ShieldAlert className="w-5 h-5 text-red-500" />
     <h3 className="font-semibold text-slate-900 dark:text-white">Real-Time Fraud Monitor</h3>
    </div>
    <button
     onClick={onTriggerScan}
     className="text-xs font-medium px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
    >
     Trigger Scan
    </button>
   </div>

   <div className="p-0 overflow-auto flex-1 max-h-[400px]">
    {events.length === 0 ? (
     <div className="p-8 text-center text-slate-500 text-sm">
      No active fraud alerts detected. System secure.
     </div>
    ) : (
     <table className="w-full text-sm text-left">
      <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-medium">
       <tr>
        <th className="px-5 py-3">Type</th>
        <th className="px-5 py-3">User</th>
        <th className="px-5 py-3">Severity</th>
        <th className="px-5 py-3">Details</th>
        <th className="px-5 py-3 text-right">Time</th>
       </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
       {events.map((event) => (
        <tr key={event.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
         <td className="px-5 py-3 font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
          {getIcon(event.type)}
          {event.type.replace('_', ' ')}
         </td>
         <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
          UID: {event.userId} {event.userName && `(${event.userName})`}
         </td>
         <td className="px-5 py-3">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                            ${event.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
            event.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
             'bg-yellow-100 text-yellow-700'}`}>
           {event.severity}
          </span>
         </td>
         <td className="px-5 py-3 text-slate-500 dark:text-slate-400 max-w-xs truncate" title={event.metadata}>
          {event.metadata}
         </td>
         <td className="px-5 py-3 text-right text-slate-400 text-xs">
          {new Date(event.createdAt).toLocaleTimeString()}
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    )}
   </div>
  </div>
 )
}
