import { Skeleton } from "@MEShadcnComponents/skeleton";
import _ from "lodash";

const AdmissionScreenAGGridLoader = () => {
  return (
    <div className="border-2 border-secondary mt-10">
      {_.times(15, (index) => {
        return (
          <>
            <div className={`grid grid-flow-row grid-cols-8`} key={_.uniqueId()}>
              <div className="border-r-2 border-secondary pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
              <div className="border-r-2 border-secondary pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
              <div className="border-r-2 border-secondary pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
              <div className="border-r-2 border-secondary pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
              <div className="border-r-2 border-secondary pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
              <div className="border-r-2 border-secondary pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
              <div className="border-r-2 border-secondary pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
              <div className="pt-2 pb-2 self-center">
                <Skeleton className="bg-secondary h-7 ml-2 mr-2" />
              </div>
            </div>
            {index < 14 && <div className="border border-secondary"/>}
          </>
        );
      })}
    </div>
  );
};

AdmissionScreenAGGridLoader.propTypes = {};

export default AdmissionScreenAGGridLoader;
