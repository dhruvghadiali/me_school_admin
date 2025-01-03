import { useSelector } from "react-redux";
import { applicantColDef } from "@MEScreenComponents/admission/formDetail/history/colDefs";

import AdmissionScreenFormDetailHistoryItem from "@MEScreenComponents/admission/formDetail/history/historyItem";

const AdmissionScreenFormDetailApplicantDetails = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);

  return (
    <>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-2 mt-5">
        {applicationFormDetail &&
          applicationFormDetail.applicationDetails &&
          applicationFormDetail.applicationDetails.student && (
            <AdmissionScreenFormDetailHistoryItem
              informationObj={applicationFormDetail.applicationDetails.student}
              colDefs={applicantColDef}
            />
          )}
      </div>
    </>
  );
};

AdmissionScreenFormDetailApplicantDetails.prototype = {};

export default AdmissionScreenFormDetailApplicantDetails;
