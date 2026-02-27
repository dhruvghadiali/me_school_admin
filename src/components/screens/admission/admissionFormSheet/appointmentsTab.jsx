import _ from "lodash";
import { useSelector } from "react-redux";
import { Calendar, Clock, User, MessageSquare } from "lucide-react";

const AppointmentsTab = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  const documentVerificationAppointments = _.get(
    selectedAdmissionApplication,
    "documentVerificationAppointments",
    [],
  );

  const feePaymentAppointments = _.get(
    selectedAdmissionApplication,
    "feePaymentAppointments",
    [],
  );

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Document Verification Appointments */}
      <div className="bg-secondary/10 rounded-lg p-4 sm:p-5 md:p-6 border border-primary/20 shadow-sm shadow-primary/10">
        <h4 className="text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4 pb-2 border-b border-primary/20">
          Document Verification Appointments
        </h4>

        {_.isArray(documentVerificationAppointments) &&
          _.size(documentVerificationAppointments) > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {_.map(documentVerificationAppointments, (appointment, index) => (
              <div
                key={appointment.id || index}
                className="bg-secondary/20 rounded-lg p-3 sm:p-4 border border-primary/10"
              >
                {/* Appointment number badge */}
                <p className="text-[10px] sm:text-xs font-semibold text-primary/60 uppercase tracking-wide mb-3">
                  Appointment #{index + 1}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {/* Scheduled Date */}
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

                  {/* Time Slot */}
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

                  {/* Booked By */}
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

                  {/* Booked At */}
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

                {/* Remarks */}
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
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground">
            No appointments scheduled
          </p>
        )}
      </div>

      {/* Fee Payment Appointments */}
      <div className="bg-secondary/10 rounded-lg p-4 sm:p-5 md:p-6 border border-primary/20 shadow-sm shadow-primary/10">
        <h4 className="text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-primary mb-3 sm:mb-4 pb-2 border-b border-primary/20">
          Fee Payment Appointments
        </h4>

        {_.isArray(feePaymentAppointments) && _.size(feePaymentAppointments) > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {_.map(feePaymentAppointments, (appointment, index) => (
              <div
                key={appointment.id || index}
                className="bg-secondary/20 rounded-lg p-3 sm:p-4 border border-primary/10"
              >
                <p className="text-[10px] sm:text-xs font-semibold text-primary/60 uppercase tracking-wide mb-3">
                  Appointment #{index + 1}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
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
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground">
            No appointments scheduled
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsTab;
