import { admissionScreenDocumentVerificationTypes } from "@MEUtils/enums";

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

import _ from "lodash";
import ParentDetails from "@MEScreenComponents/admission/formDetail/history/parentDetails";
import ApplicantDetails from "@MEScreenComponents/admission/formDetail/history/applicantDetails";
import AdmissionScreenFormDetailDocumentRemarkForm from "@MEScreenComponents/admission/formDetail/verification/remarkForm";
import AdmissionScreenFormDetailScheduleAppointment from "@MEScreenComponents/admission/formDetail/verification/scheduleAppointment";
import AdmissionScreenFormDetailDocumentVerification from "@MEScreenComponents/admission/formDetail/verification/documentVerification";
import AdmissionScreenFormDetailApplicationStatusForm from "@MEScreenComponents/admission/formDetail/verification/applicationStatusForm";

export const scheduleAppointment = [
  {
    id: "1",
    icon: CalendarClockIcon,
    title: "schedule appointment",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
  },
];

export const documentVerification = [
  {
    id: "1",
    icon: ClipboardCheckIcon,
    title: "required document",
    sub: "the reliable way to verify required documents",
    content: (
      <AdmissionScreenFormDetailDocumentVerification
        status={admissionScreenDocumentVerificationTypes.REQUIRED}
      />
    ),
  },
  {
    id: "2",
    icon: ClipboardIcon,
    title: "optional document",
    sub: "the reliable way to verify optional documents",
    content: (
      <AdmissionScreenFormDetailDocumentVerification
        status={admissionScreenDocumentVerificationTypes.OPTIONAL}
      />
    ),
  },
  {
    id: "3",
    icon: ClipboardPenIcon,
    title: "remark",
    sub: "highlight important details with remarks",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "4",
    icon: Send,
    title: "change application status",
    sub: "update student application progress in real time",
    content: (
      <AdmissionScreenFormDetailApplicationStatusForm
        items={[
          { value: _.toLower("approve"), label: _.toUpper("approve") },
          { value: _.toLower("reject"), label: _.toUpper("reject") },
        ]}
      />
    ),
  },
];

export const rejectApplicationForm = [
  {
    id: "1",
    icon: ClipboardPenIcon,
    title: "remark",
    sub: "highlight important details with remarks",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "2",
    icon: Send,
    title: "change application status",
    sub: "update student application progress in real time",
    content: (
      <AdmissionScreenFormDetailApplicationStatusForm
        items={[{ value: _.toLower("approve"), label: _.toUpper("approve") }]}
      />
    ),
  },
];

export const approvedApplicationForm = [
  {
    id: "1",
    icon: ClipboardPenIcon,
    title: "remark",
    sub: "highlight important details with remarks",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "2",
    icon: Send,
    title: "change application status",
    sub: "update student application progress in real time",
    content: (
      <AdmissionScreenFormDetailApplicationStatusForm
        items={[{ value: _.toLower("reject"), label: _.toUpper("reject") }]}
      />
    ),
  },
];

export const canceledApplicationForm = [
  {
    id: "1",
    icon: ClipboardPenIcon,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
  },
];

export const formHistory = [
  {
    id: "1",
    icon: User2,
    title: "admissionFormDetailHistoryApplicantDetailsTitle",
    sub: "admissionFormDetailHistoryApplicantDetailsSubtitle",
    content: <ApplicantDetails />,
  },
  {
    id: "2",
    icon: UsersRoundIcon,
    title: "admissionFormDetailHistoryParentsDetailsTitle",
    sub: "admissionFormDetailHistoryParentsDetailsSubtitle",
    content: <ParentDetails />,
  },
  {
    id: "3",
    icon: ReceiptIndianRupeeIcon,
    title: "Financial Background",
    sub: "Add an extra layer of security to your account",
    content:
      "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
  },
  {
    id: "4",
    icon: PhoneCallIcon,
    title: "Emergency Contacts",
    sub: "We're here to help 24/7",
    content:
      "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
  {
    id: "5",
    icon: ClipboardPenIcon,
    title: "Enrollment Details",
    sub: "We're here to help 24/7",
    content:
      "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
  {
    id: "6",
    icon: CalendarClockIcon,
    title: "Admission Scheduling Details",
    sub: "We're here to help 24/7",
    content:
      "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
  {
    id: "7",
    icon: NotebookPenIcon,
    title: "Remarks",
    sub: "We're here to help 24/7",
    content:
      "Our support team is available around the clock to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
  },
];
