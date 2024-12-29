import { admissionScreenDocumentVerificationTypes } from "@MEUtils/enums";

import {
  CalendarClockIcon,
  ClipboardCheckIcon,
  ClipboardIcon,
  ClipboardPenIcon,
  Send,
} from "lucide-react";

import _ from "lodash";
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
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
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
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
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
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "4",
    icon: Send,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
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
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "2",
    icon: Send,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
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
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailDocumentRemarkForm />,
  },
  {
    id: "2",
    icon: Send,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
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
