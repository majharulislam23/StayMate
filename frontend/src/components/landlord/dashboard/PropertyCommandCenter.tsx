import { PropertySeatSummary, SeatDto } from "@/types/auth"
import { Bed, MapPin, Power, Users } from "lucide-react"

interface PropertyCommandCenterProps {
 properties: PropertySeatSummary[]
 onToggleSeat: (seatId: number) => void
}

export const PropertyCommandCenter = ({ properties, onToggleSeat }: PropertyCommandCenterProps) => {

 const getSeatColor = (seat: SeatDto) => {
  if (seat.isOccupiedByBooking) return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800"
  if (seat.status === "BLOCKED") return "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700"
  if (seat.status === "MAINTENANCE") return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
  return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
 }

 const getSeatStatusLabel = (seat: SeatDto) => {
  if (seat.isOccupiedByBooking) return "Occupied"
  return seat.status.charAt(0) + seat.status.slice(1).toLowerCase()
 }

 return (
  <div className="space-y-6">
   <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
    <Bed className="w-5 h-5" /> Property Command Center
   </h3>

   <div className="grid grid-cols-1 gap-6">
    {properties.map((property) => (
     <div key={property.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col md:flex-row">
      {/* Property Image & Info */}
      <div className="w-full md:w-1/3 min-h-[200px] bg-slate-100 relative group">
       <img
        src={property.imageUrl || "/placeholder-property.jpg"}
        alt={property.title}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
       />
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
        <h4 className="text-white font-bold text-lg truncate shadow-sm">{property.title}</h4>
        <div className="text-white/90 text-sm flex items-center gap-1 mt-1">
         <MapPin className="w-3 h-3" /> {property.address}
        </div>
       </div>
      </div>

      {/* Seat Grid */}
      <div className="flex-1 p-6">
       <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 text-sm">
         <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <Users className="w-4 h-4" />
          {property.occupiedBeds} / {property.totalBeds} Occupied
         </div>
         <div className="flex items-center gap-1 text-emerald-600 font-medium">
          {property.availableBeds} Available
         </div>
        </div>
        <div className="text-xs text-slate-400 italic">Click available seats to block</div>
       </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {property.seats.map((seat) => (
         <div
          key={seat.id}
          onClick={() => {
           if (!seat.isOccupiedByBooking) {
            onToggleSeat(seat.id)
           }
          }}
          className={`
                                            aspect-square rounded-lg border-2 flex flex-col justify-center items-center p-2 transition-all relative
                                            ${getSeatColor(seat)}
                                        `}
          title={getSeatStatusLabel(seat)}
         >
          <Bed className="w-5 h-5 mb-1 opacity-80" />
          <span className="text-xs font-bold text-center leading-tight">
           {seat.label.replace("Bed ", "")}
          </span>
          <span className="text-[10px] uppercase font-semibold mt-1 opacity-75">
           {getSeatStatusLabel(seat)}
          </span>

          {seat.status === "BLOCKED" && (
           <div className="absolute top-1 right-1">
            <Power className="w-3 h-3 text-slate-400" />
           </div>
          )}
         </div>
        ))}
        {property.seats.length === 0 && (
         <div className="col-span-full py-8 text-center text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300">
          No seat configuration found.
         </div>
        )}
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 )
}
