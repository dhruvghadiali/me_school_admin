import { Skeleton } from "@MEShadcnComponents/skeleton";

const DashboardScreenChartSummaryLoader = () => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 mr-5 h-[500px]">
      <Skeleton className="bg-secondary" />
      <Skeleton className="bg-secondary" />
    </div>
  );
};

DashboardScreenChartSummaryLoader.propTypes = {};

export default DashboardScreenChartSummaryLoader;