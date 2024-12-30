import { useSelector } from "react-redux";
import { Accordion } from "@MEShadcnComponents/accordion";
import { ScrollArea } from "@MEShadcnComponents/scroll-area";
import { admissionScreenApplicationFormDetailStatus } from "@MEUtils/enums";

import {
  scheduleAppointment,
  documentVerification,
  rejectApplicationForm,
  approvedApplicationForm,
  canceledApplicationForm,
} from "@MEScreenComponents/admission/formDetail/accordionList";

import _ from "lodash";
import AdmissionScreenFormDetailAccordionItem from "@MEScreenComponents/admission/formDetail/formDetailAccordionItem";
import AdmissionScreenFormDetailDocumentVerificationLoader from "@MEScreenComponents/admission/formDetail/verification/documentVerificationLoader";

const AdmissionScreenFormDetailVerification = () => {
  const { applicationFormDetail, documentVerificationLoader } = useSelector(
    (state) => state.admission
  );

  return (
    <>
      <ScrollArea className="max-h-[70vh]">
        <div className="ml-2 mb-2 pl-2 ">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="0"
          >
            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(admissionScreenApplicationFormDetailStatus.PENDING) &&
              (documentVerificationLoader ? (
                <AdmissionScreenFormDetailDocumentVerificationLoader />
              ) : (
                documentVerification.map((item) => (
                  <AdmissionScreenFormDetailAccordionItem item={item} />
                ))
              ))}

            {applicationFormDetail &&
              !applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(admissionScreenApplicationFormDetailStatus.PENDING) &&
              scheduleAppointment.map((item) => (
                <AdmissionScreenFormDetailAccordionItem item={item} />
              ))}

            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(
                  admissionScreenApplicationFormDetailStatus.APPROVED
                ) &&
              approvedApplicationForm.map((item) => (
                <AdmissionScreenFormDetailAccordionItem item={item} />
              ))}

            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(
                  admissionScreenApplicationFormDetailStatus.REJECTED
                ) &&
              rejectApplicationForm.map((item) => (
                <AdmissionScreenFormDetailAccordionItem item={item} />
              ))}

            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(
                  admissionScreenApplicationFormDetailStatus.CANCELED
                ) &&
              canceledApplicationForm.map((item) => (
                <AdmissionScreenFormDetailAccordionItem item={item} />
              ))}
          </Accordion>
        </div>
      </ScrollArea>
    </>
  );
};

AdmissionScreenFormDetailVerification.propTypes = {};

export default AdmissionScreenFormDetailVerification;
