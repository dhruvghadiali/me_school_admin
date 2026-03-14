import { Skeleton } from "@MEShadcnComponents/skeleton";

const ProfileScreenLoader = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-primary/10 bg-secondary/50 shadow-lg shadow-primary/50 p-6"
        >
          {/* Card header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-48 rounded" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </div>

          {/* Grid of fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-4 w-36 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileScreenLoader;
