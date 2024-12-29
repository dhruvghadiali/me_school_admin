import { Skeleton } from "@MEShadcnComponents/skeleton";
import _ from "lodash";

const AdmissionScreenFormDetailDocumentVerificationLoader = () => {
  return (
    <>
      {_.times(4, (index) => {
        return (
          <div
            className="flex items-center space-x-4 mb-5 pb-5 border-b"
            key={index}
          >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-96" />
              <Skeleton className="h-4 w-72" />
            </div>
          </div>
        );
      })}
    </>
  );
};

AdmissionScreenFormDetailDocumentVerificationLoader.prototype = {};

export default AdmissionScreenFormDetailDocumentVerificationLoader;
