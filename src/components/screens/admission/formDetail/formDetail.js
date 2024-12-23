import { useDispatch } from "react-redux";
import { setAdmissionScreenContainerType } from "@MERedux/admission/admissionSlice";
import { admissionScreenContainerType, variants } from "@MEUtils/enums";

import {
  CircleX,
  Plus,
  User2,
  UsersRoundIcon,
  ReceiptIndianRupeeIcon,
  ClipboardPen,
  CalendarClockIcon,
  NotebookPenIcon,
  PhoneCallIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@MEShadcnComponents/accordion";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import MEButton from "@MECommonComponents/button/meButton";
import MEBadge from "@MECommonComponents/badge/meBadge";

const AdmissionScreenFormDetail = () => {
  const dispatch = useDispatch();

  const items = [
    {
      id: "1",
      icon: User2,
      title: "Applicant Details",
      sub: "Manage your linked social and work accounts",
      content:
        "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
    },
    {
      id: "2",
      icon: UsersRoundIcon,
      title: "Parent/Guardian Details",
      sub: "Customize your notification preferences",
      content:
        "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
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
      title: "Emergency Contact Details",
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
      <div className="grid grid-flow-row grid-cols-2 mt-5 ml-1 mb-2">
        <div className="self-center">
          <h2 className="text-xl font-bold">
            {"Dhruv Ghadiali Admission Form "}
            <MEBadge badgeVariant={variants.PRIMARY}>{"PENDDING"}</MEBadge>
          </h2>
        </div>
        <div className="justify-self-end mt-5 ml-1  mb-2">
          <MEButton
            className="rounded-full bg-dark"
            variant="icon"
            size="icon"
            aria-label="Close"
            onClick={() =>
              dispatch(
                setAdmissionScreenContainerType(
                  admissionScreenContainerType.AGGRIDTABLE
                )
              )
            }
          >
            <CircleX
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="text-secondary"
            />
          </MEButton>
        </div>
      </div>

      <div className="space-y-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="0"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                  <span className="flex items-center gap-3 ">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-dark"
                      aria-hidden="true"
                    >
                      <item.icon
                        size={16}
                        strokeWidth={2}
                        className="opacity-60 text-secondary"
                      />
                    </span>
                    <span className="flex flex-col space-y-1">
                      <span>{item.title}</span>
                      {item.sub && (
                        <span className="text-sm font-normal">{item.sub}</span>
                      )}
                    </span>
                  </span>
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="ms-3 pb-2 ps-10 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

AdmissionScreenFormDetail.propTypes = {};

export default AdmissionScreenFormDetail;
