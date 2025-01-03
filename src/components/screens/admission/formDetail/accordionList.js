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
  ReceiptIndianRupeeIcon,
} from "lucide-react";
import {
  admissionScreenDocumentVerificationTypes,
  admissionScreenApplicationStatusDropdown,
} from "@MEUtils/enums";

import _ from "lodash";
import AdmissionScreenFormDetailParentsDetails from "@MEScreenComponents/admission/formDetail/history/parentsDetails";
import AdmissionScreenFormDetailApplicantDetails from "@MEScreenComponents/admission/formDetail/history/applicantDetails";
import AdmissionScreenFormDetailDocumentRemarkForm from "@MEScreenComponents/admission/formDetail/verification/remarkForm";
import AdmissionScreenFormDetailScheduleAppointment from "@MEScreenComponents/admission/formDetail/verification/scheduleAppointment";
import AdmissionScreenFormDetailDocumentVerification from "@MEScreenComponents/admission/formDetail/verification/documentVerification";
import AdmissionScreenFormDetailApplicationStatusForm from "@MEScreenComponents/admission/formDetail/verification/applicationStatusForm";
import AdmissionScreenFormDetailEmergencyContactDetails from "@MEScreenComponents/admission/formDetail/history/emergencyContactDetails";

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
    id: "4",
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
    content:
      "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
  {
    id: "6",
    icon: CalendarClockIcon,
    title: "admissionFormDetailHistoryAdmissionSchedulingDetailsTitle",
    sub: "admissionFormDetailHistoryAdmissionSchedulingDetailsSubtitle",
    content:
      "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
  {
    id: "7",
    icon: NotebookPenIcon,
    title: "admissionFormDetailHistoryRemarksTitle",
    sub: "admissionFormDetailHistoryRemarksSubtitle",
    content:
      "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
];
