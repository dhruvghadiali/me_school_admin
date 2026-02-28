import _ from "lodash";
import { Calendar, Clock, User, MessageSquare } from "lucide-react";

const FeePaymentAppointmentCardComponent = ({ appointment, index }) => {
    return (
        <div className="bg-secondary/20 rounded-lg p-3 sm:p-4 border border-primary/10">
            <p className="text-[10px] sm:text-xs font-semibold text-primary/60 uppercase tracking-wide mb-3">
                Appointment #{index + 1}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Date
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">
                            {appointment.scheduledDate || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Time Slot
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">
                            {appointment.scheduledTimeSlot || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Booked By
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5 wrap-break-word">
                            {appointment.bookedBy || "N/A"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Booked At
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">
                            {appointment.bookedAt || "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            {appointment.remarks && (
                <div className="mt-3 pt-2.5 border-t border-primary/20 flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <div>
                        <p className="text-[10px] sm:text-xs font-semibold text-primary/60 uppercase tracking-wide mb-0.5">
                            Remarks
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                            {appointment.remarks}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeePaymentAppointmentCardComponent;