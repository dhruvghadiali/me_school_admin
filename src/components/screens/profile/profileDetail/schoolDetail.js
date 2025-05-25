import { User2Icon } from "lucide-react";
import { Accordion } from "@MEShadcnComponents/accordion";
import { Card, CardContent } from "@MEShadcnComponents/card";
import { ScrollArea } from "@MEShadcnComponents/scroll-area";

import ProfileScreenSchoolDetailAccordionItem from "@MEScreenComponents/profile/profileDetail/schoolDetailAccordionItem";

const ProfileScreenSchoolDetail = () => {
  const formHistory = [
    {
      id: "1",
      icon: User2Icon,
      title: "admissionFormDetailHistoryApplicantDetailsTitle", // security details
      sub: "admissionFormDetailHistoryApplicantDetailsSubtitle",
      content: (
        <div>
          <div className="h-[3000px] border border-indigo-600"></div>
        </div>
      ),
    },
    {
      id: "2",
      icon: User2Icon,
      title: "admissionFormDetailHistoryApplicantDetailsTitle", // fees details
      sub: "admissionFormDetailHistoryApplicantDetailsSubtitle",
      content: (
        <>
          <div className="h-[3000px] border border-black"></div>
        </>
      ),
    },
    {
      id: "3",
      icon: User2Icon,
      title: "admissionFormDetailHistoryApplicantDetailsTitle", // fees details
      sub: "admissionFormDetailHistoryApplicantDetailsSubtitle",
      content: (
        <>
          <div className="h-[3000px] border border-black"></div>
        </>
      ),
    },
    {
      id: "4",
      icon: User2Icon,
      title: "admissionFormDetailHistoryApplicantDetailsTitle", // fees details
      sub: "admissionFormDetailHistoryApplicantDetailsSubtitle",
      content: (
        <>
          <div className="h-[3000px] border border-black"></div>
        </>
      ),
    },
  ];

  return (
    <>
      <Card className="mt-10 mb-5 mr-5">
        <CardContent>
          <div className="grid ">
            <ScrollArea className="max-h-[75vh]">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="0"
              >
                {formHistory.map((item) => (
                  <ProfileScreenSchoolDetailAccordionItem item={item} />
                ))}
              </Accordion>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

ProfileScreenSchoolDetail.propTypes = {};

export default ProfileScreenSchoolDetail;
