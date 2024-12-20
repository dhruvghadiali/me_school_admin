import { Skeleton } from "../../../ui/skeleton";

const HomeScreenSummaryLoader = () => {

  return (
    <div className="grid grid-flow-row grid-cols-4 mr-5 gap-4 mt-5 mb-5 h-36">
      <Skeleton className="bg-secondary" />
      <Skeleton className="bg-secondary" />
      <Skeleton className="bg-secondary" />
      <Skeleton className="bg-secondary" />
    </div>
  );
};

export default HomeScreenSummaryLoader;
