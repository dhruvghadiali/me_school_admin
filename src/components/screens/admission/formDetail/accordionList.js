import { CalendarClockIcon, ClipboardCheckIcon, ClipboardIcon, ClipboardPenIcon } from "lucide-react";

import _ from "lodash";
import AdmissionScreenScheduleAppointment from "@MEScreenComponents/admission/formDetail/scheduleAppointment";

export const scheduleAppointment = [
  {
    id: "1",
    icon: CalendarClockIcon,
    title: "schedule appointment",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenScheduleAppointment />,
  },
];

export const documentVerification = [
  {
    id: "1",
    icon: ClipboardCheckIcon,
    title: "required document",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenScheduleAppointment />,
  },
  {
    id: "2",
    icon: ClipboardIcon,
    title: "optional document",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenScheduleAppointment />,
  },
  {
    id: "3",
    icon: ClipboardPenIcon,
    title: "change application status",
    sub: "easily set up appointments and keep your schedule on track with just a few clicks!",
    content: <AdmissionScreenScheduleAppointment />,
  },
];
