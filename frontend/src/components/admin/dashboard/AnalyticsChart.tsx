import { UserAcquisitionPoint } from "@/types/auth"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AnalyticsChartProps {
 data: UserAcquisitionPoint[]
}

export const AnalyticsChart = ({ data }: AnalyticsChartProps) => {

 const chartData = useMemo(() => {
  // Transform (Date, Role, Count) -> { date, USER: 5, HOUSE_OWNER: 2 }
  const map = new Map<string, any>()

  data.forEach(point => {
   const date = point.date
   if (!map.has(date)) {
    map.set(date, { name: date })
   }
   const entry = map.get(date)
   // Clean role name: ROLE_USER -> User
   const roleKey = point.role === 'ROLE_HOUSE_OWNER' ? 'Landlords' :
    point.role === 'ROLE_USER' ? 'Tenants' : 'Other'
   entry[roleKey] = point.count
  })

  // Sort by date
  return Array.from(map.values()).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
 }, [data])

 return (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 h-full">
   <h3 className="font-semibold text-slate-900 dark:text-white mb-6">User Acquisition Trend</h3>
   <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
     <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
      <XAxis
       dataKey="name"
       stroke="#888888"
       fontSize={12}
       tickLine={false}
       axisLine={false}
       tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
      />
      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip
       contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
       cursor={{ fill: 'transparent' }}
      />
      <Legend iconType="circle" />
      <Bar dataKey="Tenants" fill="#6366f1" radius={[4, 4, 0, 0]} stackId="a" />
      <Bar dataKey="Landlords" fill="#14b8a6" radius={[4, 4, 0, 0]} stackId="a" />
     </BarChart>
    </ResponsiveContainer>
   </div>
  </div>
 )
}
