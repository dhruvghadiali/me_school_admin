import { useSelector } from "react-redux";
import { Accordion } from "@MEShadcnComponents/accordion";
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

const AdmissionScreenFormDetailVerification = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);

  return (
    <>
      <div className="ml-2 pl-2">
        <div className="mb-2">
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
              documentVerification.map((item) => (
                <AdmissionScreenFormDetailAccordionItem item={item} />
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
              rejectApplicationForm.map((item) => (
                <AdmissionScreenFormDetailAccordionItem item={item} />
              ))}

            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(
                  admissionScreenApplicationFormDetailStatus.REJECTED
                ) &&
              approvedApplicationForm.map((item) => (
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
      </div>
    </>
  );
};

AdmissionScreenFormDetailVerification.propTypes = {};

export default AdmissionScreenFormDetailVerification;
