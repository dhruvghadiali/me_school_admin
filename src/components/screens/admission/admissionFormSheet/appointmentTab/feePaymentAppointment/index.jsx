import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

import { ChevronDown, Calendar, User } from "@MEShadcnComponents/collapsible";

import _ from "lodash";

import FeePaymentAppointmentCardComponent from "@MEScreenComponents/admission/admissionFormSheet/appointmentTab/feePaymentAppointment/feePaymentAppointmentCard";

const FeePaymentAppointmentComponent = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );
  const feePaymentAppointments = _.get(
    selectedAdmissionApplication,
    "feePaymentAppointments",
    [],
  );

  return (
    <Collapsible defaultOpen={false}>
      <div className="bg-secondary/50 shadow-lg shadow-primary/50 rounded-lg p-4 border border-primary/10">
        <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer group">
          <h4 className="text-sm  font-semibold text-primary">
            {_.upperCase("Fee Payment")}
          </h4>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>

        <CollapsibleContent className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="mb-3" />
          {_.isArray(feePaymentAppointments) &&
          _.size(feePaymentAppointments) > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {_.map(feePaymentAppointments, (appointment, index) => (
                <FeePaymentAppointmentCardComponent
                  key={appointment.id || index}
                  index={index}
                  remarks={appointment.remarks}
                  appointmentDeatils={[
                    {
                      label: "Appointment Date",
                      icon: <Calendar className="w-3.5 h-3.5" />,
                      value: appointment.scheduledDate || "N/A",
                    },
                    {
                      label: "Booked By",
                      icon: <User className="w-3.5 h-3.5" />,
                      value: appointment.bookedBy || "N/A",
                    },
                    {
                      label: "Booked At",
                      icon: <Calendar className="w-3.5 h-3.5" />,
                      value: appointment.bookedAt || "N/A",
                    },
                    {
                      label: "Verified By",
                      icon: <User className="w-3.5 h-3.5" />,
                      value: appointment.verifiedBy || "N/A",
                    },
                    {
                      label: "Verified At",
                      icon: <Calendar className="w-3.5 h-3.5" />,
                      value: appointment.verifiedAt || "N/A",
                    },
                  ]}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground">
              No appointments scheduled
            </p>
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default FeePaymentAppointmentComponent;
