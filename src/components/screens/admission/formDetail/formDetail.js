import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@MEShadcnComponents/card";

import AdmissionScreenFormDetailHeader from "@MEScreenComponents/admission/formDetail/formDetailHeader";
import AdmissionScreenFormDetailVerification from "@MEScreenComponents/admission/formDetail/verification/verification";
import AdmissionScreenFormDetailHistory from "@MEScreenComponents/admission/formDetail/history/history";

const AdmissionScreenFormDetail = () => {
  return (
    <>
      <Card className="mt-10 mb-5">
        <CardHeader>
          <AdmissionScreenFormDetailHeader />
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-row grid-cols-3  ">
            <div className="border-r border-secondary col-span-2 pr-5">
              <AdmissionScreenFormDetailHistory />
            </div>
            <div className="overflow-auto max-h-[65vh]">
              <AdmissionScreenFormDetailVerification />
            </div>
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
