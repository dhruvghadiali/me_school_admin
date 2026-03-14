import { useTranslation } from "react-i18next";

import _ from "lodash";

import { profileHeader, profileSubtitle } from "@MELocalization/en";

const ProfileScreenHeader = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {_.startCase(t("profileHeader", { defaultValue: profileHeader }))}
      </p>
      <p className="text-sm mt-1">
        {_.upperFirst(
          t("profileSubtitle", {
            defaultValue: profileSubtitle,
          }),
        )}
      </p>
    </div>
  );
};

export default ProfileScreenHeader;
