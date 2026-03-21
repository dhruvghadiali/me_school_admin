import _ from "lodash";

const CampusHoursInformationComponent = ({title, hours}) => {
  return (
    <div className="mt-5 pt-4 border-t border-primary/15">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary/50 mb-3">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2">
        {_.map(hours, (hour, i) => (
          <div
            key={i}
            className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 rounded-md border border-primary/15 px-3 py-2.5"
          >
            <p className="text-xs font-semibold text-primary/60 shrink-0">
              {hour.label}
            </p>
            <p
              className={`text-xs font-semibold ${
                _.toLower(hour.value) === _.toLower("closed") ? "text-danger" : "text-primary"
              }`}
            >
              {hour.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusHoursInformationComponent;
