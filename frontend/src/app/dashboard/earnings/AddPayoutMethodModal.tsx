"use client"

import { financeApi } from "@/lib/api"
import { PayoutMethodRequest } from "@/types/auth"
import { Banknote, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

interface AddPayoutMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddPayoutMethodModal({ isOpen, onClose, onSuccess }: AddPayoutMethodModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PayoutMethodRequest>()

  if (!isOpen) return null

  const onSubmit = async (data: PayoutMethodRequest) => {
    try {
      await financeApi.addPayoutMethod(data)
      toast.success("Bank account added successfully")
      reset()
      onSuccess()
      onClose()
    } catch (error) {
      toast.error("Failed to add bank account")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Banknote className="w-5 h-5 text-blue-600" />
            Add Bank Account
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              {...register("bankName", { required: "Bank name is required" })}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Chase Bank, BRAC Bank"
            />
            {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Holder Name</label>
            <input
              {...register("accountHolderName", { required: "Account holder name is required" })}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name on Account"
            />
            {errors.accountHolderName && <p className="text-red-500 text-xs mt-1">{errors.accountHolderName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Account Number</label>
            <input
              {...register("accountNumber", { required: "Account number is required" })}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
              placeholder="0000000000"
            />
            {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Routing / IFSC</label>
              <input
                {...register("routingNumber")}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                {...register("currency", { required: "Required" })}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? "Saving..." : "Save Bank Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
