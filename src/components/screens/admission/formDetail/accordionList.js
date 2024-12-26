import { CalendarClockIcon, ClipboardCheckIcon, ClipboardIcon, ClipboardPenIcon } from "lucide-react";

import _ from "lodash";
import AdmissionScreenFormDetailScheduleAppointment from "@MEScreenComponents/admission/formDetail/verification/scheduleAppointment";
import AdmissionScreenFormDetailDocumentVerification from "@MEScreenComponents/admission/formDetail/verification/documentVerification";

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
    content: <AdmissionScreenFormDetailDocumentVerification />,
  },
  {
    id: "2",
    icon: ClipboardIcon,
    title: "optional document",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
  },
  {
    id: "3",
    icon: ClipboardPenIcon,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
  },
];


export const rejectApplicationForm = [
  {
    id: "1",
    icon: ClipboardPenIcon,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
  },
];

export const approvedApplicationForm = [
  {
    id: "1",
    icon: ClipboardPenIcon,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenFormDetailScheduleAppointment />,
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