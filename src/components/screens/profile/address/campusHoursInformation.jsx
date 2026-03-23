import {useTranslation} from "react-i18next";

import _ from "lodash";
import moment from "moment";

import {profileAddressClosedLabel} from "@MELocalization/en";

const CampusHoursInformationComponent = ({ title, hours }) => {
  const { t } = useTranslation();

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
                _.get(hour, "value.closed", false)
                  ? "text-danger"
                  : "text-primary"
              }`}
            >
              {_.get(hour, "value.closed", false)
                ? _.upperFirst(t("profileAddressClosedLabel", { defaultValue: profileAddressClosedLabel }))
                : `${
                    moment(_.get(hour, "value.openTime", ""), "HH:mm", true).isValid()
                      ? moment(_.get(hour, "value.openTime", ""), "HH:mm", true).format("hh:mm A")
                      : ""
                  } - ${
                    moment(_.get(hour, "value.closeTime", ""), "HH:mm", true).isValid()
                      ? moment(_.get(hour, "value.closeTime", ""), "HH:mm", true).format("hh:mm A")
                      : ""
                  }`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampusHoursInformationComponent;
