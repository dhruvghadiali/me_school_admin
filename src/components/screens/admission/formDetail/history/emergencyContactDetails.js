import { useSelector } from "react-redux";
import { emergencyContactsColDef } from "@MEScreenComponents/admission/formDetail/history/colDefs";

import AdmissionScreenFormDetailHistoryItem from "@MEScreenComponents/admission/formDetail/history/historyItem";

const AdmissionScreenFormDetailEmergencyContactDetails = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);

  return (
    <>
      <div className="grid grid-cols-3 gap-x-5 gap-y-2 mt-5">
        {applicationFormDetail &&
          applicationFormDetail.applicationDetails &&
          applicationFormDetail.applicationDetails.emergencyContact.length >=
            2 && (
            <>
              <AdmissionScreenFormDetailHistoryItem
                informationObj={
                  applicationFormDetail.applicationDetails.emergencyContact[0]
                }
                colDefs={emergencyContactsColDef}
              />
              <AdmissionScreenFormDetailHistoryItem
                informationObj={
                  applicationFormDetail.applicationDetails.emergencyContact[1]
                }
                colDefs={emergencyContactsColDef}
              />
            </>
          )}
      </div>
    </>
  );
};

AdmissionScreenFormDetailEmergencyContactDetails.prototype = {};

export default AdmissionScreenFormDetailEmergencyContactDetails;
