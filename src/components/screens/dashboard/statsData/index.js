import { FileCheck, CheckCircle2, XCircle, Clock, Trash2 } from "lucide-react";
import { Card, CardContent } from "@MEShadcnComponents/card";

const DashboardScreenStatsData = () => {
  const statsData = [
    {
      id: 1,
      label: "Total Application Submitted",
      value: "156",
      icon: FileCheck,
    },
    {
      id: 2,
      label: "Total Selected Application",
      value: "89",
      icon: CheckCircle2,
    },
    {
      id: 3,
      label: "Total Rejected Application",
      value: "18",
      icon: XCircle,
    },
    {
      id: 4,
      label: "Total In Progress Application",
      value: "49",
      icon: Clock,
    },
    {
      id: 5,
      label: "Total Withdrawn Application",
      value: "0",
      icon: Trash2,
    },
  ];

  return (
    <div className="mt-8 mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
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
  );
};

export default DashboardScreenStatsData;
