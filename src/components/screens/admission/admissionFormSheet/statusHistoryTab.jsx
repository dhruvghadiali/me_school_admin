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
      <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 px-4">
        <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3 md:mb-4">
          <CalendarRangeIcon className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">
          No Status History
        </h3>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs md:max-w-sm">
          Status changes and updates will appear here once available
        </p>
      </div>
    );
  }

  return (
    <div className="relative px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 mx-auto">
      <div className="absolute left-[22px] sm:left-[26px] md:left-[34px] lg:left-[38px] top-0 bottom-0 w-0.5 bg-primary/50 ml-2" />
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {_.map(selectedAdmissionApplication.statusHistory, (history, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={history.id || index}
              className="relative flex gap-3 sm:gap-4 md:gap-5 lg:gap-6"
            >
              <div className="shrink-0 relative z-5">
                <div
                  className={`w-8 h-8 rounded-full bg-primary flex items-center justify-center border-3 sm:border-4 border-white ring-4 ring-primary/20 `}
                >
                  <CircleDotIcon className="text-secondary w-4 h-4" />
                </div>
              </div>

              <div className="flex-1 pb-1 sm:pb-2">
                <div className="bg-secondary/10 rounded-lg p-4 sm:p-6 border border-primary/50 shadow-lg shadow-primary/50 hover:cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3 md:mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary wrap-break-word">
                          {_.startCase(history.status) || "N/A"}
                        </h3>
                        {isFirst && (
                          <p className="inline-flex items-center rounded-full text-xs font-semibold bg-primary text-secondary border border-primary py-1 px-2 ">
                            Latest
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2 text-primary/70">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0" />
                        <p className="text-xs wrap-break-word">
                          {history.changedAt || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-3 md:mb-4 p-2 sm:p-2.5 md:p-3 bg-primary/90 rounded-lg shadow-lg shadow-primary/30">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 border-2 border-secondary/30">
                      <span className="text-sm font-bold text-primary">
                        {history.changedBy?.firstName
                          ?.charAt(0)
                          ?.toUpperCase() || "?"}
                        {history.changedBy?.lastName
                          ?.charAt(0)
                          ?.toUpperCase() || ""}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-secondary shrink-0" />
                        <p className="text-[10px] sm:text-xs text-secondary">
                          Changed by
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-secondary">
                        {history.changedBy
                          ? _.trim(
                              `${_.startCase(history.changedBy.firstName)} ${_.startCase(history.changedBy.lastName)}`,
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {history.remarks && (
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-primary/50 ">
                      <p className="text-xs font-semibold text-primary mb-1.5 md:mb-2 uppercase tracking-wide">
                        Remarks
                      </p>
                      <p className="text-xs text-primary leading-relaxed wrap-break-word">
                        {history.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusHistoryTab;
