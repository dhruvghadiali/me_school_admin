import { useSelector } from "react-redux";
import { FileCheck2, File } from "lucide-react";
import { Label } from "@MEShadcnComponents/label";
import { Accordion } from "@MEShadcnComponents/accordion";
import { admissionScreenApplicationFormDetailStatus } from "@MEUtils/enums";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@MEShadcnComponents/select";
import {
  scheduleAppointment,
  documentVerification,
} from "@MEScreenComponents/admission/formDetail/accordionList";

import _ from "lodash";
import AdmissionScreenAccordionItem from "@MEScreenComponents/admission/formDetail/formDetailAccordionItem";

const DocumentVerification = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);

  const items = [
    {
      id: "1",
      icon: FileCheck2,
      title: "Required Documents",
      sub: "Manage your linked social and work accounts",
      content: (
        <div className="space-y-2">
          <div className="grid grid-flow-row grid-cols-3 justify-center items-center mb-2">
            <Label className="col-span-2"> Required Documents </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-flow-row grid-cols-3 justify-center items-center mb-2">
            <Label className="col-span-2"> Required Documents </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      icon: File,
      title: "Optional Documents",
      sub: "Customize your notification preferences",
      content: (
        <div className="space-y-2">
          <div className="grid grid-flow-row grid-cols-3 justify-center items-center mb-2">
            <Label className="col-span-2"> Required Documents </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-flow-row grid-cols-3 justify-center items-center mb-2">
            <Label className="col-span-2"> Required Documents </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="border-l border-secondary ml-2 pl-2">
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
                <AdmissionScreenAccordionItem item={item} />
              ))}

            {applicationFormDetail &&
              !applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(admissionScreenApplicationFormDetailStatus.PENDING) &&
              scheduleAppointment.map((item) => (
                <AdmissionScreenAccordionItem item={item} />
              ))}

            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(
                  admissionScreenApplicationFormDetailStatus.APPROVED
                ) &&
              items.map((item) => <AdmissionScreenAccordionItem item={item} />)}

            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(
                  admissionScreenApplicationFormDetailStatus.REJECTED
                ) &&
              items.map((item) => <AdmissionScreenAccordionItem item={item} />)}

            {applicationFormDetail &&
              applicationFormDetail.appointmentDate &&
              _.toLower(applicationFormDetail.applicationStatus) ===
                _.toLower(
                  admissionScreenApplicationFormDetailStatus.CANCELED
                ) &&
              items.map((item) => <AdmissionScreenAccordionItem item={item} />)}
          </Accordion>
        </div>
      </div>
    </>
  );
};

DocumentVerification.propTypes = {};

export default DocumentVerification;
