import _ from "lodash";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@MEShadcnComponents/collapsible";

import DocumentVerificationAppointmentCardComponent from "@MEScreenComponents/admission/admissionFormSheet/appointmentTab/documentVerificationAppointment/documentVerificationAppointmentCard";

const DocumentVerificationAppointmentComponent = () => {
    const { selectedAdmissionApplication } = useSelector(
        (state) => state.admissionApplication,
    );

    const documentVerificationAppointments = _.get(
        selectedAdmissionApplication,
        "documentVerificationAppointments",
        [],
    );

    return (
        <Collapsible defaultOpen={false}>
            <div className="bg-secondary/10 rounded-lg p-4 sm:p-5 md:p-6 border border-primary/20 shadow-sm shadow-primary/10">
                <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer group">
                    <h4 className="text-sm sm:text-sm md:text-base lg:text-lg font-semibold text-primary">
                        Document Verification Appointments
                    </h4>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="mb-3" />
                    {_.isArray(documentVerificationAppointments) &&
                        _.size(documentVerificationAppointments) > 0 ? (
                        <div className="space-y-3 sm:space-y-4">
                            {_.map(documentVerificationAppointments, (appointment, index) => (
                                <DocumentVerificationAppointmentCardComponent
                                    key={appointment.id || index}
                                    appointment={appointment}
                                    index={index}
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
}

export default DocumentVerificationAppointmentComponent;