import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Label } from "@MEShadcnComponents/label";
import { Separator } from "@MEShadcnComponents/separator";
import { formateStringWithLodash } from "@MEUtils/utilityFunctions";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";
import { parentsColDefs } from "@MEScreenComponents/admission/formDetail/history/colDefs";

import _ from "lodash";
import AdmissionScreenFormDetailHistoryItem from "@MEScreenComponents/admission/formDetail/history/historyItem";

const AdmissionScreenFormDetailParentsDetails = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);
  const { t, i18n } = useTranslation();

  return (
    <>
      <Separator className="bg-dark mt-5" />
      <div>
        <Label className="text-base font-bold ">
          {i18n.exists("admissionFormDetailHistoryFatherDetails")
            ? formateStringWithLodash(
                t("admissionFormDetailHistoryFatherDetails"),
                _.startCase
              )
            : formateStringWithLodash(
                admissionHub.admissionFormDetailHistoryFatherDetails,
                _.startCase
              )}
        </Label>
      </div>
      <Separator className="bg-dark" />

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-2 mt-5">
        {applicationFormDetail &&
          applicationFormDetail.applicationDetails &&
          applicationFormDetail.applicationDetails.father && (
            <AdmissionScreenFormDetailHistoryItem
              informationObj={applicationFormDetail.applicationDetails.father}
              colDefs={parentsColDefs}
            />
          )}
      </div>

      <Separator className="bg-dark mt-5" />
      <div>
        <Label className="text-base font-bold ">
          {i18n.exists("admissionFormDetailHistoryMotherDetails")
            ? formateStringWithLodash(
                t("admissionFormDetailHistoryMotherDetails"),
                _.startCase
              )
            : formateStringWithLodash(
                admissionHub.admissionFormDetailHistoryMotherDetails,
                _.startCase
              )}
        </Label>
      </div>
      <Separator className="bg-dark" />

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-2 mt-5">
        {applicationFormDetail &&
          applicationFormDetail.applicationDetails &&
          applicationFormDetail.applicationDetails.mother && (
            <AdmissionScreenFormDetailHistoryItem
              informationObj={applicationFormDetail.applicationDetails.mother}
              colDefs={parentsColDefs}
            />
          )}
      </div>
    </>
  );
};

AdmissionScreenFormDetailParentsDetails.prototype = {};

export default AdmissionScreenFormDetailParentsDetails;
