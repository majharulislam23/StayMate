"use client"

import { financeApi } from "@/lib/api"
import { EarningDto, PaymentDto, PayoutRequest } from "@/types/auth"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function AdminFinancePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "payouts" | "transactions">("payouts")
  const [payouts, setPayouts] = useState<PayoutRequest[]>([])
  const [payments, setPayments] = useState<PaymentDto[]>([])
  const [earnings, setEarnings] = useState<EarningDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Payout Status filter
  const [payoutStatus, setPayoutStatus] = useState<string>("PENDING")

  const fetchPayouts = async () => {
    try {
      const data = await financeApi.getAllPayoutRequests(payoutStatus === "ALL" ? null : payoutStatus)
      // @ts-ignore
      setPayouts(data.content || [])
    } catch (e) {
      toast.error("Failed to load payouts")
    }
  }

  const fetchPayments = async () => {
    const data = await financeApi.getAllPayments()
    // @ts-ignore
    setPayments(data.content || [])
  }

  const fetchEarnings = async () => {
    const data = await financeApi.getAllEarnings()
    // @ts-ignore
    setEarnings(data.content || [])
  }

  useEffect(() => {
    setIsLoading(true)
    if (activeTab === "payouts") fetchPayouts().finally(() => setIsLoading(false))
    if (activeTab === "transactions") {
      Promise.all([fetchPayments(), fetchEarnings()]).finally(() => setIsLoading(false))
    }
    if (activeTab === "overview") setIsLoading(false) // Todo: Overview stats
  }, [activeTab, payoutStatus])

  const handlePayoutAction = async (id: number, status: string, notes: string = "") => {
    try {
      await financeApi.processPayoutRequest(id, status, notes)
      toast.success(`Payout ${status.toLowerCase()} successfully`)
      fetchPayouts()
    } catch (error) {
      toast.error("Action failed")
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Oversight</h1>
        <div className="flex gap-2">
          {["payouts", "transactions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "payouts" && (
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            {["PENDING", "APPROVED", "REJECTED", "PAID", "ALL"].map(s => (
              <button
                key={s}
                onClick={() => setPayoutStatus(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${payoutStatus === s
                    ? "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400"
                    : "border-slate-200 dark:border-slate-700 text-slate-500"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 font-medium">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Requested</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {payouts.map((r) => (
                  <tr key={r.id}>
                    <td className="p-4">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {r.user.firstName} {r.user.lastName}
                      </p>
                      <p className="text-xs text-slate-500">{r.user.email}</p>
                    </td>
                    <td className="p-4 font-mono font-bold">${r.amount.toLocaleString()}</td>
                    <td className="p-4 text-xs">
                      <p>{r.payoutMethod.bankName}</p>
                      <p className="opacity-70">{r.payoutMethod.accountNumber}</p>
                    </td>
                    <td className="p-4 text-xs opacity-70">
                      {format(new Date(r.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${r.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          r.status === 'PAID' ? 'bg-green-100 text-green-800' :
                            r.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {r.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handlePayoutAction(r.id, "APPROVED")}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handlePayoutAction(r.id, "REJECTED")}
                            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {r.status === "APPROVED" && (
                        <button
                          onClick={() => handlePayoutAction(r.id, "PAID")}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {payouts.length === 0 && (
              <div className="p-8 text-center text-slate-500">No requests found.</div>
            )}
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incoming Payments */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold">User Payments</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left opacity-50"><th className="p-3">User</th><th className="p-3">Amount</th><th className="p-3">Date</th></tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td className="p-3">Booking #{p.bookingId}</td>
                    <td className="p-3 font-bold">${p.amount}</td>
                    <td className="p-3">{format(new Date(p.date), 'MM/dd')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Earnings Generated */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold">Earnings (Commissions)</h3>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left opacity-50"><th className="p-3">Prop</th><th className="p-3">Net</th><th className="p-3">Comm</th></tr>
              </thead>
              <tbody>
                {earnings.map(e => (
                  <tr key={e.id}>
                    <td className="p-3 truncate max-w-[100px]">{e.propertyTitle}</td>
                    <td className="p-3 font-bold">${e.netAmount}</td>
                    <td className="p-3 text-green-600">+${e.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
