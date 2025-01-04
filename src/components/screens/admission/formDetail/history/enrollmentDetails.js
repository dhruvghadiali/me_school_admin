import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Label } from "@MEShadcnComponents/label";
import { Separator } from "@MEShadcnComponents/separator";
import { formateStringWithLodash } from "@MEUtils/utilityFunctions";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";

import {
  admissionDetailsColDef,
  previousSchoolDetailsColDef,
} from "@MEScreenComponents/admission/formDetail/history/colDefs";

import _ from "lodash";
import AdmissionScreenFormDetailHistoryItem from "@MEScreenComponents/admission/formDetail/history/historyItem";

const AdmissionScreenFormDetailEnrollmentDetails = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);
  const { t, i18n } = useTranslation();

  return (
    <>
      <Separator className="bg-dark mt-5" />
      <div>
        <Label className="text-base font-bold ">
          {i18n.exists("admissionFormDetailHistoryAdmissionDetails")
            ? formateStringWithLodash(
                t("admissionFormDetailHistoryAdmissionDetails"),
                _.startCase
              )
            : formateStringWithLodash(
                admissionHub.admissionFormDetailHistoryAdmissionDetails,
                _.startCase
              )}
        </Label>
      </div>
      <Separator className="bg-dark" />

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-2 mt-5">
        {applicationFormDetail &&
          applicationFormDetail.applicationDetails &&
          applicationFormDetail.applicationDetails.admissionDetail && (
            <AdmissionScreenFormDetailHistoryItem
              informationObj={
                applicationFormDetail.applicationDetails.admissionDetail
              }
              colDefs={admissionDetailsColDef}
            />
          )}
      </div>

      <Separator className="bg-dark mt-5" />
      <div>
        <Label className="text-base font-bold ">
          {i18n.exists("admissionFormDetailHistoryPreviousSchoolDetails")
            ? formateStringWithLodash(
                t("admissionFormDetailHistoryPreviousSchoolDetails"),
                _.startCase
              )
            : formateStringWithLodash(
                admissionHub.admissionFormDetailHistoryPreviousSchoolDetails,
                _.startCase
              )}
        </Label>
      </div>
      <Separator className="bg-dark" />

      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-2 mt-5">
        {applicationFormDetail &&
          applicationFormDetail.applicationDetails &&
          applicationFormDetail.applicationDetails.previousSchool && (
            <AdmissionScreenFormDetailHistoryItem
              informationObj={
                applicationFormDetail.applicationDetails.previousSchool
              }
              colDefs={previousSchoolDetailsColDef}
            />
          )}
      </div>
    </>
  );
};

AdmissionScreenFormDetailEnrollmentDetails.prototype = {};

export default AdmissionScreenFormDetailEnrollmentDetails;
