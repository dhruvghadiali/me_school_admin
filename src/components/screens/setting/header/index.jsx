import { useTranslation } from "react-i18next";

import _ from "lodash";

import { settingHeader, settingSubtitle } from "@MELocalization/en";

const SettingScreenHeaderComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {_.startCase(t("settingHeader", { defaultValue: settingHeader }))}
      </p>
      <p className="text-sm mt-1">
        {_.upperFirst(
          t("settingSubtitle", {
            defaultValue: settingSubtitle,
          }),
        )}
      </p>
    </div>
  );
};

export default SettingScreenHeaderComponent;
