import { useTranslation } from "react-i18next";
import { profile } from "@MELocalizationEn/profile/profileTranslationEn";

import _ from "lodash";

const ProfileScreenHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="text-3xl font-semibold">
        {i18n.exists("profileHeader")
          ? _.startCase(t("profileHeader"))
          : _.startCase(profile.profileHeader)}
      </p>
      <p className="text-sm mt-1">
        {i18n.exists("profileSubtitle")
          ? _.upperFirst(t("profileSubtitle"))
          : _.upperFirst(profile.profileSubtitle)}
      </p>
    </div>
  );
};

ProfileScreenHeader.propTypes = {};

export default ProfileScreenHeader;
