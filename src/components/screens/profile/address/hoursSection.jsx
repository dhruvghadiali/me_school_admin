import { useTranslation } from "react-i18next";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import { Label } from "@MEShadcnComponents/label";
import { Checkbox } from "@MEShadcnComponents/checkbox";
import {
  profileAddressFormOpenTimeLabel,
  profileAddressFormCloseTimeLabel,
  profileAddressFormClosedLabel,
} from "@MELocalization/en";

import METimePicker from "@MECommonComponents/form/input/meTimePicker";

const DAYS_OF_WEEK = [
  {
    key: "monday",
    labelKey: "profileAddressMondayLabel",
  },
  {
    key: "tuesday",
    labelKey: "profileAddressTuesdayLabel",
  },
  {
    key: "wednesday",
    labelKey: "profileAddressWednesdayLabel",
  },
  {
    key: "thursday",
    labelKey: "profileAddressThursdayLabel",
  },
  {
    key: "friday",
    labelKey: "profileAddressFridayLabel",
  },
  {
    key: "saturday",
    labelKey: "profileAddressSaturdayLabel",
  },
  {
    key: "sunday",
    labelKey: "profileAddressSundayLabel",
  },
];

const HoursSection = ({ title, fieldPrefix, formik }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8 pt-4 border-t border-primary/20">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary/70 mb-4">
        {_.upperCase(title)}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-3">
        {_.map(DAYS_OF_WEEK, ({ key, labelKey }) => {
          const isClosed = _.get(
            formik.values,
            `${fieldPrefix}.${key}.closed`,
            false,
          );
          const openTimeError = _.get(
            formik.errors,
            `${fieldPrefix}.${key}.openTime`,
            "",
          );
          const closeTimeError = _.get(
            formik.errors,
            `${fieldPrefix}.${key}.closeTime`,
            "",
          );

          return (
            <div
              key={key}
              className={`rounded-lg border px-3 py-3 transition-colors ${
                isClosed
                  ? "border-primary/10 bg-primary/3"
                  : "border-primary/15 bg-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className={`text-xs font-semibold tracking-wide ${
                    isClosed
                      ? "text-primary/40 line-through"
                      : "text-primary/70"
                  }`}
                >
                  {_.upperFirst(t(labelKey))}
                </p>
                <div className="flex items-center gap-1.5">
                  <Checkbox
                    id={`${fieldPrefix}-${key}-closed`}
                    checked={isClosed}
                    onCheckedChange={(checked) => {
                      formik.setFieldValue(
                        `${fieldPrefix}.${key}.closed`,
                        checked,
                      );
                      formik.setFieldValue(
                        `${fieldPrefix}.${key}.openTime`,
                        "",
                      );
                      formik.setFieldValue(
                        `${fieldPrefix}.${key}.closeTime`,
                        "",
                      );
                    }}
                  />
                  <Label
                    htmlFor={`${fieldPrefix}-${key}-closed`}
                    className="text-xs text-primary/60 cursor-pointer"
                  >
                    {_.upperFirst(
                      t("profileAddressFormClosedLabel", {
                        defaultValue: profileAddressFormClosedLabel,
                      }),
                    )}
                  </Label>
                </div>
              </div>
              {isClosed ? (
                <p className="text-xs text-primary/40 italic py-2">
                  {_.upperFirst(
                    t("profileAddressFormClosedLabel", {
                      defaultValue: profileAddressFormClosedLabel,
                    }),
                  )}
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <METimePicker
                    label={_.upperFirst(
                      t("profileAddressFormOpenTimeLabel", {
                        defaultValue: profileAddressFormOpenTimeLabel,
                      }),
                    )}
                    value={_.get(
                      formik.values,
                      `${fieldPrefix}.${key}.openTime`,
                      "",
                    )}
                    inputvariant={
                      openTimeError ? variants.DANGER : variants.PRIMARY
                    }
                    messagevariant={
                      openTimeError ? variants.DANGER : variants.PRIMARY
                    }
                    message={openTimeError}
                    onValueChange={(val) => {
                      formik.setFieldValue(
                        `${fieldPrefix}.${key}.openTime`,
                        val,
                      );
                    }}
                  />
                  <METimePicker
                    label={_.upperFirst(
                      t("profileAddressFormCloseTimeLabel", {
                        defaultValue: profileAddressFormCloseTimeLabel,
                      }),
                    )}
                    value={_.get(
                      formik.values,
                      `${fieldPrefix}.${key}.closeTime`,
                      "",
                    )}
                    inputvariant={
                      closeTimeError ? variants.DANGER : variants.PRIMARY
                    }
                    messagevariant={
                      closeTimeError ? variants.DANGER : variants.PRIMARY
                    }
                    message={closeTimeError}
                    onValueChange={(val) => {
                      formik.setFieldValue(
                        `${fieldPrefix}.${key}.closeTime`,
                        val,
                      );
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoursSection;
