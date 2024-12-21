import { Skeleton } from "@MEShadcnComponents/skeleton";

import _ from "lodash";

const AdmissionScreenAGGridLoader = () => {
  return (
    <div className="border-4 border-secondary mr-10 mt-10">
      {_.times(15, (_) => {
        return (
          <div className={`grid grid-flow-row grid-cols-8 gap-1 mb-5 mt-1 h-5`}>
            <Skeleton className="bg-secondary p-4 rounded-none" />
            <Skeleton className="bg-secondary p-4 rounded-none" />
            <Skeleton className="bg-secondary p-4 rounded-none" />
            <Skeleton className="bg-secondary p-4 rounded-none" />
            <Skeleton className="bg-secondary p-4 rounded-none" />
            <Skeleton className="bg-secondary p-4 rounded-none" />
            <Skeleton className="bg-secondary p-4 rounded-none" />
            <Skeleton className="bg-secondary p-4 rounded-none" />
          </div>
        );
      })}
    </div>
  );
};

AdmissionScreenAGGridLoader.propTypes = {};

export default AdmissionScreenAGGridLoader;
