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
                  <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 md:items-center mb-3 md:mb-4">
                    {/* Status & Date */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs sm:text-sm lg:text-base font-bold text-primary wrap-break-word">
                          {_.startCase(history.status) || "N/A"}
                        </h3>
                        {isFirst && (
                          <span className="inline-flex items-center rounded-full text-[10px] sm:text-xs font-semibold bg-primary text-secondary py-0.5 px-2.5">
                            Latest
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-primary/60">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <p className="text-[10px] sm:text-xs">
                          {history.changedAt || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Changed By */}
                    <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-primary/90 rounded-lg shadow-md shadow-primary/20 self-start md:self-center shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 border-2 border-secondary/20">
                        <span className="text-xs font-bold text-primary leading-none">
                          {history.changedBy?.firstName?.charAt(0)?.toUpperCase() || "?"}
                          {history.changedBy?.lastName?.charAt(0)?.toUpperCase() || ""}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <User className="w-2.5 h-2.5 text-secondary/60 shrink-0" />
                          <p className="text-[9px] sm:text-[10px] text-secondary/60 uppercase tracking-wide">
                            Changed by
                          </p>
                        </div>
                        <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-secondary truncate max-w-[120px] sm:max-w-40">
                          {history.changedBy
                            ? _.trim(`${_.startCase(history.changedBy.firstName)} ${_.startCase(history.changedBy.lastName)}`)
                            : "N/A"}
                        </p>
                      </div>
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
