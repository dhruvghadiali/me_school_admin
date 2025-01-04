import { Card, CardContent, CardHeader } from "@MEShadcnComponents/card";
import { ScrollArea } from "@MEShadcnComponents/scroll-area";

import AdmissionScreenFormDetailHeader from "@MEScreenComponents/admission/formDetail/formDetailHeader";
import AdmissionScreenFormDetailHistory from "@MEScreenComponents/admission/formDetail/history/history";
import AdmissionScreenFormDetailVerification from "@MEScreenComponents/admission/formDetail/verification/verification";

const AdmissionScreenFormDetail = () => {
  return (
    <>
      <Card className="mt-10 mb-5">
        <CardHeader>
          <AdmissionScreenFormDetailHeader />
        </CardHeader>
        <CardContent>
          <div className="grid grid-flow-row grid-cols-[auto_50vh]  ">
            <AdmissionScreenFormDetailHistory />
            <AdmissionScreenFormDetailVerification />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

AdmissionScreenFormDetail.propTypes = {};

export default AdmissionScreenFormDetail;
