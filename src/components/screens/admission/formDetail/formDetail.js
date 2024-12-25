import {
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@MEShadcnComponents/card";

import ParentDetails from "@MEScreenComponents/admission/formDetail/parentDetails";
import ApplicantDetails from "@MEScreenComponents/admission/formDetail/applicantDetails";
import DocumentVerification from "@MEScreenComponents/admission/formDetail/documentVerification";
import AdmissionScreenFormDetailHeader from "@MEScreenComponents/admission/formDetail/formDetailHeader";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

const AdmissionScreenFormDetail = () => {
  
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
      <Card className="mt-10 mb-5">
        <CardHeader>
          <AdmissionScreenFormDetailHeader/>
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-row grid-cols-3">
            <div className="col-span-2">
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
                              <span className="text-sm font-normal">
                                {item.sub}
                              </span>
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
            <DocumentVerification />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription>{"** Notes **"}</CardDescription>
        </CardFooter>
      </Card>
    </>
  );
};

AdmissionScreenFormDetail.propTypes = {};

export default AdmissionScreenFormDetail;
