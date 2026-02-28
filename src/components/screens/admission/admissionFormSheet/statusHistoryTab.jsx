import { useSelector } from "react-redux";
import { CalendarRangeIcon, Clock, User, CircleDotIcon } from "lucide-react";

import _ from "lodash";

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
      <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
          <CalendarRangeIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />
        </div>
        <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-1.5">
          No Status History
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-xs">
          Status changes and updates will appear here once available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Application Status History
        </h4>

        {_.map(selectedAdmissionApplication.statusHistory, (history, index) => {
          return (
            <div key={history.id} className="flex gap-3 sm:gap-4">
              <div className="flex flex-col items-center pt-1">
                <div
                  className={`w-3 h-3 rounded-full border-2 border-primary`}
                />
                <div className="w-0.5 h-10 sm:h-16 bg-linear-to-b from-primary/40 to-primary/20 mt-2" />
              </div>
              <div className="flex-1 pb-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1.5">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs sm:text-sm font-bold w-fit`}
                  >
                    {_.upperCase(history?.status) || "N/A"}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {history?.changedAt || "N/A"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                  By:{" "}
                  <span className="font-bold text-foreground">
                    {_.upperFirst(history?.changedBy?.firstName) || ""}{" "}
                    {_.upperFirst(history?.changedBy?.lastName) || ""}{" "}
                    {history?.changedBy?.username
                      ? `(${history?.changedBy?.username})`
                      : ""}
                  </span>
                </p>
                {history?.remarks && (
                  <p className="text-xs sm:text-sm text-foreground bg-muted/40 p-2 sm:p-3 rounded-lg border border-primary/40 italic">
                    "{history?.remarks || ""}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusHistoryTab;
