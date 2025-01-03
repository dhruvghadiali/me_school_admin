import {
  User2,
  Send,
  ClipboardIcon,
  PhoneCallIcon,
  UsersRoundIcon,
  NotebookPenIcon,
  ClipboardPenIcon,
  CalendarClockIcon,
  ClipboardCheckIcon,
} from "lucide-react";
import {
  admissionScreenDocumentVerificationTypes,
  admissionScreenApplicationStatusDropdown,
} from "@MEUtils/enums";

import _ from "lodash";
import AdmissionScreenFormDetailRemarks from "@MEScreenComponents/admission/formDetail/history/remarks";
import AdmissionScreenFormDetailParentsDetails from "@MEScreenComponents/admission/formDetail/history/parentsDetails";
import AdmissionScreenFormDetailApplicantDetails from "@MEScreenComponents/admission/formDetail/history/applicantDetails";
import AdmissionScreenFormDetailEnrollmentDetails from "@MEScreenComponents/admission/formDetail/history/enrollmentDetails";
import AdmissionScreenFormDetailEmergencyContactDetails from "@MEScreenComponents/admission/formDetail/history/emergencyContactDetails";

import AdmissionScreenFormDetailDocumentRemarkForm from "@MEScreenComponents/admission/formDetail/verification/remarkForm";
import AdmissionScreenFormDetailScheduleAppointment from "@MEScreenComponents/admission/formDetail/verification/scheduleAppointment";
import AdmissionScreenFormDetailDocumentVerification from "@MEScreenComponents/admission/formDetail/verification/documentVerification";
import AdmissionScreenFormDetailApplicationStatusForm from "@MEScreenComponents/admission/formDetail/verification/applicationStatusForm";

export const scheduleAppointment = [
  {
    id: "1",
    icon: CalendarClockIcon,
    title: "admissionFormDetailVerificationScheduleAppointmentTitle",
    sub: "admissionFormDetailVerificationScheduleAppointmentSubtitle",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
  },
];

export const documentVerification = [
  {
    id: "1",
    icon: ClipboardCheckIcon,
    title: "admissionFormDetailVerificationRequiredDocumentTitle",
    sub: "admissionFormDetailVerificationRequiredDocumentSubtitle",
    content: (
      <AdmissionScreenFormDetailDocumentVerification
        status={admissionScreenDocumentVerificationTypes.REQUIRED}
      />
    ),
  },
  {
    id: "2",
    icon: ClipboardIcon,
    title: "admissionFormDetailVerificationOptionalDocumentTitle",
    sub: "admissionFormDetailVerificationOptionalDocumentSubtitle",
    content: (
      <AdmissionScreenFormDetailDocumentVerification
        status={admissionScreenDocumentVerificationTypes.OPTIONAL}
      />
    ),
  },
  {
    id: "3",
    icon: ClipboardPenIcon,
    title: "admissionFormDetailVerificationRemarkTitle",
    sub: "admissionFormDetailVerificationRemarkSubtitle",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "5",
    icon: CalendarClockIcon,
    title: "admissionFormDetailVerificationScheduleAppointmentTitle",
    sub: "admissionFormDetailVerificationScheduleAppointmentSubtitle",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
  },
  {
    id: "6",
    icon: Send,
    title: "admissionFormDetailVerificationChangeApplicationStatusTitle",
    sub: "admissionFormDetailVerificationChangeApplicationStatusSubtitle",
    content: (
      <AdmissionScreenFormDetailApplicationStatusForm
        items={[
          {
            value: _.toLower(admissionScreenApplicationStatusDropdown.APPROVE),
            label: _.toUpper(admissionScreenApplicationStatusDropdown.APPROVE),
          },
          {
            value: _.toLower(admissionScreenApplicationStatusDropdown.REJECT),
            label: _.toUpper(admissionScreenApplicationStatusDropdown.REJECT),
          },
        ]}
      />
    ),
  },
];

export const rejectApplicationForm = [
  {
    id: "1",
    icon: ClipboardPenIcon,
    title: "admissionFormDetailVerificationRemarkTitle",
    sub: "admissionFormDetailVerificationRemarkSubtitle",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "2",
    icon: Send,
    title: "admissionFormDetailVerificationChangeApplicationStatusTitle",
    sub: "admissionFormDetailVerificationChangeApplicationStatusSubtitle",
    content: (
      <AdmissionScreenFormDetailApplicationStatusForm
        items={[
          {
            value: _.toLower(admissionScreenApplicationStatusDropdown.APPROVE),
            label: _.toUpper(admissionScreenApplicationStatusDropdown.APPROVE),
          },
        ]}
      />
    ),
  },
];

export const approvedApplicationForm = [
  {
    id: "1",
    icon: ClipboardPenIcon,
    title: "admissionFormDetailVerificationRemarkTitle",
    sub: "admissionFormDetailVerificationRemarkSubtitle",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "2",
    icon: Send,
    title: "admissionFormDetailVerificationChangeApplicationStatusTitle",
    sub: "admissionFormDetailVerificationChangeApplicationStatusSubtitle",
    content: (
      <AdmissionScreenFormDetailApplicationStatusForm
        items={[
          {
            value: _.toLower(admissionScreenApplicationStatusDropdown.REJECT),
            label: _.toUpper(admissionScreenApplicationStatusDropdown.REJECT),
          },
        ]}
      />
    ),
  },
];

export const formHistory = [
  {
    id: "1",
    icon: User2,
    title: "admissionFormDetailHistoryApplicantDetailsTitle",
    sub: "admissionFormDetailHistoryApplicantDetailsSubtitle",
    content: <AdmissionScreenFormDetailApplicantDetails />,
  },
  {
    id: "2",
    icon: UsersRoundIcon,
    title: "admissionFormDetailHistoryParentsDetailsTitle",
    sub: "admissionFormDetailHistoryParentsDetailsSubtitle",
    content: <AdmissionScreenFormDetailParentsDetails />,
  },
  {
    id: "3",
    icon: PhoneCallIcon,
    title: "admissionFormDetailHistoryEmergencyContactsTitle",
    sub: "admissionFormDetailHistoryEmergencyContactsSubtitle",
    content: <AdmissionScreenFormDetailEmergencyContactDetails />,
  },
  {
    id: "5",
    icon: ClipboardPenIcon,
    title: "admissionFormDetailHistoryEnrollmentDetailsTitle",
    sub: "admissionFormDetailHistoryEnrollmentDetailsSubtitle",
    content: <AdmissionScreenFormDetailEnrollmentDetails/>
  },
  {
    id: "6",
    icon: NotebookPenIcon,
    title: "admissionFormDetailHistoryRemarksTitle",
    sub: "admissionFormDetailHistoryRemarksSubtitle",
    content: <AdmissionScreenFormDetailRemarks/>
  },
];
