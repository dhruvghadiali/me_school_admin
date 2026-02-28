import { useSelector } from "react-redux";

import _ from "lodash";
import { FileCheck, CheckCircle2, XCircle, Clock, Trash2 } from "lucide-react";

import { Card, CardContent } from "@MEShadcnComponents/card";

const ICON_MAP = {
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
};

const DashboardScreenStatsData = () => {
  const { dashboardSummary } = useSelector((state) => state.dashboard);

  return dashboardSummary &&
    dashboardSummary.statsData &&
    _.size(dashboardSummary.statsData) > 0 ? (
    <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
      {_.map(dashboardSummary.statsData, (stat) => {
        const IconComponent = ICON_MAP[stat.icon];
        return (
          <Card key={stat.id} className="border">
            <CardContent className="pt-6">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {stat.label}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <div
                  className={`bg-primary/5 border shadow-md shadow-primary/5 p-2 rounded-lg`}
                >
                  <IconComponent className={`w-6 h-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  ) : (
    <div className="mt-8 mb-8 p-6 bg-danger/10  border border-danger/50  rounded-lg">
      <p className="text-danger  font-medium">
        Error: Unable to load some summary data. Please try again later.
      </p>
    </div>
  );
};

export default DashboardScreenStatsData;
