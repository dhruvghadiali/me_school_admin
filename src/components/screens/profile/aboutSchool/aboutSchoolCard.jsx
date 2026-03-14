import { useTranslation } from "react-i18next";
import { Pencil, Building2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import { setAboutSchoolFormSheetStatus } from "@MERedux/profile/profileSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  profileSchoolAboutTitle,
  profileSchoolAboutEditButtonLabel,
  profileSchoolAboutPlaceholder,
} from "@MELocalization/en";

import MEButton from "@MECommonComponents/form/button/meButton";

const AboutSchoolCardComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authentication);

  // open about school form sheet
  const handleEditClick = () => {
    dispatch(setAboutSchoolFormSheetStatus(true));
  };

  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          <CardTitle>
            {_.upperCase(
              t("profileSchoolAboutTitle", {
                defaultValue: profileSchoolAboutTitle,
              }),
            )}
          </CardTitle>
        </div>
        <MEButton
          type="button"
          buttonVariant={variants.PRIMARY}
          buttonClassName="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 h-auto"
          onClick={handleEditClick}
        >
          <Pencil className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">
            {_.upperFirst(
              t("profileSchoolAboutEditButtonLabel", {
                defaultValue: profileSchoolAboutEditButtonLabel,
              }),
            )}
          </span>
          <span className="xs:hidden">
            {_.upperFirst(
              t("profileSchoolAboutEditButtonLabel", {
                defaultValue: profileSchoolAboutEditButtonLabel,
              }),
            )}
          </span>
        </MEButton>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm text-primary wrap-break-word">
            {_.get(user, "school.about", "") ||
              _.upperFirst(
                t("profileSchoolAboutPlaceholder", {
                  defaultValue: profileSchoolAboutPlaceholder,
                }),
              )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSchoolCardComponent;
