import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Separator } from "@MEShadcnComponents/separator";
import { remarksColDef } from "@MEScreenComponents/admission/formDetail/history/colDefs";

import _ from "lodash";
import AdmissionScreenFormDetailHistoryItem from "@MEScreenComponents/admission/formDetail/history/historyItem";

const AdmissionScreenFormDetailRemarks = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="mt-5">
        {applicationFormDetail &&
          applicationFormDetail.applicationDetails &&
          applicationFormDetail.applicationDetails.remarks &&
          applicationFormDetail.applicationDetails.remarks.length > 0 &&
          _.map(applicationFormDetail.applicationDetails.remarks, (remark) => (
            <>
              <div className="grid grid-cols-[auto_15vh]">
                <AdmissionScreenFormDetailHistoryItem
                  informationObj={remark}
                  colDefs={remarksColDef}
                />
              </div>
              <Separator className="mb-5" />
            </>
          ))}
      </div>
    </>
  );
};

AdmissionScreenFormDetailRemarks.prototype = {};

export default AdmissionScreenFormDetailRemarks;
