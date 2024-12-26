import { Accordion } from "@MEShadcnComponents/accordion";
import {
  User2,
  UsersRoundIcon,
  ReceiptIndianRupeeIcon,
  ClipboardPen,
  CalendarClockIcon,
  NotebookPenIcon,
  PhoneCallIcon,
} from "lucide-react";

import ParentDetails from "@MEScreenComponents/admission/formDetail/history/parentDetails";
import ApplicantDetails from "@MEScreenComponents/admission/formDetail/history/applicantDetails";
import AdmissionScreenFormDetailAccordionItem from "@MEScreenComponents/admission/formDetail/formDetailAccordionItem";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

const AdmissionScreenFormDetailHistory = () => {
  const items = [
    {
      id: "1",
      icon: User2,
      title: "Applicant Details",
      sub: "Manage your linked social and work accounts",
      content: <ApplicantDetails />,
    },
    {
      id: "2",
      icon: UsersRoundIcon,
      title: "Parent/Guardian Details",
      sub: "Customize your notification preferences",
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
      icon: ClipboardPen,
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

  return (
    <>
      <div className="">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="0"
        >
          {items.map((item) => (
            <AdmissionScreenFormDetailAccordionItem item={item} />
          ))}
        </Accordion>
      </div>
    </>
  );
};

AdmissionScreenFormDetailHistory.prototype = {};

export default AdmissionScreenFormDetailHistory;
