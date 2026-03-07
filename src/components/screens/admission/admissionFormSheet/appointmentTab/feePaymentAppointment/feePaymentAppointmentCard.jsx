import _ from "lodash";
import { MessageSquare } from "lucide-react";

const FeePaymentAppointmentCardComponent = ({
  index,
  appointmentDeatils,
  remarks,
}) => {
  return (
    <div className="bg-secondary/50 rounded-md p-3 border border-primary/30">
      <p className="text-xs font-semibold text-primary mb-4">
        Appointment #{index + 1}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {_.map(appointmentDeatils, (detail, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="text-primary/60 mt-0.5 shrink-0">{detail.icon}</div>
            <div key={idx} className="space-y-1">
              <p className="text-xs font-medium text-primary/60">
                {detail.label}
              </p>
              <p className="text-sm font-semibold text-primary wrap-break-word">
                {detail.value || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {remarks && (
        <div className="mt-3 pt-2.5 border-t border-primary/20 flex items-start gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary/60">Remarks</p>
            <p className="text-sm font-semibold text-primary wrap-break-word">
              {remarks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeePaymentAppointmentCardComponent;
