import _ from "lodash";

const StatusHistoryTab = ({ application }) => {
  // Mock data for now - replace with actual data from application
  const statusHistory = _.get(application, "statusHistory", []);

  if (!statusHistory || statusHistory.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No status history available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {statusHistory.map((history, index) => (
        <div
          key={history.id || index}
          className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {index + 1}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {_.startCase(history.status) || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Changed By
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {history.changedBy || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    Changed At
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    {history.changedAt || "N/A"}
                  </p>
                </div>
                {history.remarks && (
                  <div className="sm:col-span-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Remarks
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {history.remarks}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusHistoryTab;
