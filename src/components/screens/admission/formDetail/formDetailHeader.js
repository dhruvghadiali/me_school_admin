import { CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { formateStringWithLodash } from "@MEUtils/utilityFunctions";
import { CardTitle, CardDescription } from "@MEShadcnComponents/card";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";
import { defaultAdmissionFormDetail } from "@MERedux/admission/admissionDefaultStateValues";

import {
  variants,
  admissionScreenContainerType,
  admissionScreenApplicationFormDetailStatus,
} from "@MEUtils/enums";
import {
  setApplicationFormDetail,
  setAdmissionScreenContainerType,
} from "@MERedux/admission/admissionSlice";

import _ from "lodash";
import MEBadge from "@MECommonComponents/badge/meBadge";
import MEButton from "@MECommonComponents/button/meButton";

const AdmissionScreenFormDetailHeader = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const onCloseFormDetailCard = () => {
    dispatch(setApplicationFormDetail(defaultAdmissionFormDetail));
    dispatch(
      setAdmissionScreenContainerType(admissionScreenContainerType.AGGRIDTABLE)
    );
  };

  const setBadgeVariant = (status) => {
    switch (status) {
      case admissionScreenApplicationFormDetailStatus.PENDING:
        return variants.PRIMARY;
      case admissionScreenApplicationFormDetailStatus.APPROVED:
        return variants.SUCCESS;
      case admissionScreenApplicationFormDetailStatus.REJECTED:
        return variants.DANGER;
      case admissionScreenApplicationFormDetailStatus.CANCELED:
        return variants.WARNING;
      default:
        return variants.PRIMARY;
    }
  };

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2">
        <div className="self-center">
          <CardTitle className="text-xl font-bold">
            {i18n.exists("admissionFormDetailCardTitleDynamic")
              ? formateStringWithLodash(
                  t("admissionFormDetailCardTitleDynamic", {
                    number:
                      applicationFormDetail &&
                      applicationFormDetail.applicationNumber &&
                      applicationFormDetail.applicationNumber,
                  }),
                  _.startCase
                )
              : formateStringWithLodash(
                  admissionHub.admissionFormDetailCardTitleStatic,
                  _.startCase
                )}{" "}
            {applicationFormDetail &&
              applicationFormDetail.applicationStatus && (
                <MEBadge
                  badgeVariant={setBadgeVariant(
                    applicationFormDetail.applicationStatus
                  )}
                >
                  {_.upperCase(applicationFormDetail.applicationStatus)}
                </MEBadge>
              )}
          </CardTitle>
          <CardDescription>
            {applicationFormDetail &&
              applicationFormDetail.studentName &&
              formateStringWithLodash(
                applicationFormDetail.studentName,
                _.startCase
              )}
          </CardDescription>
        </div>
        <div className="justify-self-end mt-5 ml-1  mb-2">
          <MEButton
            className="rounded-full bg-dark"
            variant="icon"
            size="icon"
            aria-label="Close"
            onClick={() => onCloseFormDetailCard()}
          >
            <CircleX
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="text-secondary"
            />
          </MEButton>
        </div>
      </div>
    </>
  );
};

AdmissionScreenFormDetailHeader.prototype = {};

export default AdmissionScreenFormDetailHeader;
