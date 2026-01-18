"use client"

import { financeApi } from "@/lib/api"
import { PaymentDto, SpendingSummaryResponse } from "@/types/auth"
import { format } from "date-fns"
import { Calendar, CheckCircle, Clock, CreditCard, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function UserPaymentsPage() {
  const [summary, setSummary] = useState<SpendingSummaryResponse | null>(null)
  const [payments, setPayments] = useState<PaymentDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, paymentsData] = await Promise.all([
          financeApi.getMySpendingSummary(),
          financeApi.getMyPayments(0, 20)
        ])
        setSummary(summaryData)
        // @ts-ignore
        setPayments(paymentsData.content || [])
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch payment data", error)
        toast.error("Failed to load payment history")
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="w-8 h-8 mx-auto border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500">Loading payments...</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payments & Spending</h1>
          <p className="text-slate-500 dark:text-slate-400">Track all your rent and booking payments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard className="w-24 h-24 text-blue-500" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 text-blue-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-slate-700 dark:text-slate-300">Total Spent</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white relative z-10">
            ${summary?.totalSpent?.toLocaleString() || "0"}
          </p>
          <p className="text-sm text-blue-600 flex items-center gap-1 mt-2 relative z-10">
            <CheckCircle className="w-4 h-4" />
            Lifetime Payments
          </p>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Payment History</h3>
        </div>

        {payments.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No payments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 font-medium">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="p-4 text-slate-500 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(p.date), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center gap-2 mt-1 opacity-70">
                        <Clock className="w-3 h-3" />
                        {format(new Date(p.date), 'hh:mm a')}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-900 dark:text-white">
                        Booking #{p.bookingId}
                      </p>
                      <p className="text-xs text-slate-500">{p.propertyTitle}</p>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {p.paymentMethod || "CARD"}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === 'COMPLETED' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                          p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                            'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-slate-900 dark:text-white">
                      ${p.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
