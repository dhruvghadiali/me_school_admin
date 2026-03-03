import { useSelector } from "react-redux";
import { CalendarRangeIcon } from "lucide-react";

import _ from "lodash";

import MEAlertCardComponent from "@MECommonComponents/card/alertCard";
import METimeLineCardComponent from "@MECommonComponents/card/timeLineCard";

const StatusHistoryTab = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  if (
    !selectedAdmissionApplication ||
    !selectedAdmissionApplication.statusHistory ||
    !_.isArray(selectedAdmissionApplication.statusHistory) ||
    _.size(selectedAdmissionApplication.statusHistory) === 0
  ) {
    return (
      <MEAlertCardComponent
        icon={
          <CalendarRangeIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
        }
        alertText="No Status History"
        alertMessage="Status changes and updates will appear here once available"
      />
    );
  }

  return (
    <METimeLineCardComponent
      title="Application Status History"
      informationList={_.map(
        selectedAdmissionApplication.statusHistory,
        (history) => ({
          status: history?.status,
          time: history?.changedAt,
          username: `${_.upperFirst(history?.changedBy?.firstName) || ""} ${_.upperFirst(history?.changedBy?.lastName) || ""} ${history?.changedBy?.username ? `(${history?.changedBy?.username})` : ""}`,
          remarks: history?.remarks,
        }),
      )}
    />
  );
};

export default StatusHistoryTab;
