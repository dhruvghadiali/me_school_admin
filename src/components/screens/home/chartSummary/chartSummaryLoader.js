import { Skeleton } from "../../../ui/skeleton";

const HomeScreenChartSummaryLoader = () => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 mr-5 h-[500px]">
      <Skeleton className="bg-secondary" />
      <Skeleton className="bg-secondary" />
    </div>
  );
};

export default HomeScreenChartSummaryLoader;