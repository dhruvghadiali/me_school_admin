
import { CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CardTitle, CardDescription } from "@MEShadcnComponents/card";
import { admissionScreenContainerType, variants } from "@MEUtils/enums";

import {
  setApplicationFormDetail,
  setAdmissionScreenContainerType,
} from "@MERedux/admission/admissionSlice";

import _ from "lodash";
import MEBadge from "@MECommonComponents/badge/meBadge";
import MEButton from "@MECommonComponents/button/meButton";

const AdmissionScreenFormDetailHeader = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);
  const dispatch = useDispatch();

  const onCloseFormDetailCard = () => {
    dispatch(setApplicationFormDetail({}));
    dispatch(
      setAdmissionScreenContainerType(admissionScreenContainerType.AGGRIDTABLE)
    );
  };

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2">
        <div className="self-center">
          <CardTitle className="text-xl font-bold">
            {`Application No: ${
              applicationFormDetail &&
              applicationFormDetail.applicationNumber &&
              applicationFormDetail.applicationNumber
            }`}{" "}
            <MEBadge badgeVariant={variants.PRIMARY}>
              {applicationFormDetail &&
                applicationFormDetail.applicationStatus &&
                _.upperCase(applicationFormDetail.applicationStatus)}
            </MEBadge>
          </CardTitle>
          <CardDescription>
            {applicationFormDetail &&
              applicationFormDetail.studentName &&
              _.startCase(applicationFormDetail.studentName)}
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
