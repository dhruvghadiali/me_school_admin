import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { PROFILE_FORM_SHEET_MODES } from "@MEHelpers/enums";
import { setMemberFormSheetStatus } from "@MERedux/profile/profileSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@MEShadcnComponents/sheet";
import {
  profileAddOrganizationMemberSheetTitle,
  profileEditOrganizationMemberSheetTitle,
  profileEditOrganizationMemberSheetDescription,
  profileAddOrganizationMemberSheetDescription,
} from "@MELocalization/en";

import OrganizationMemberFormComponent from "@MEScreenComponents/profile/organizationMember/organizationMemberForm";

const OrganizationMemberSheetComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { memberFormSheetOpen, memberFormSheetMode } = useSelector((state) => state.profile);

  // Function to toggle the sheet open/close status
  const toggleSheet = (status) => {
    dispatch(setMemberFormSheetStatus(status));
  };

  return (
    <Sheet open={memberFormSheetOpen} onOpenChange={toggleSheet}>
      <SheetContent
        side="bottom"
        className="h-full w-full overflow-hidden flex flex-col p-0"
      >
        {/* Sheet Header */}
        <div className="border-b border-primary/50 px-4 sm:px-6 md:px-8 shadow-lg shadow-primary/80">
          <SheetHeader className="space-y-1 sm:space-y-1.5 p-1 m-2">
            <SheetTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-left m-0 p-0">
              {_.startCase(
                t(
                  memberFormSheetMode === PROFILE_FORM_SHEET_MODES.ADD
                    ? "profileAddOrganizationMemberSheetTitle"
                    : "profileEditOrganizationMemberSheetTitle",
                  {
                    defaultValue:
                      memberFormSheetMode === PROFILE_FORM_SHEET_MODES.ADD
                        ? profileAddOrganizationMemberSheetTitle
                        : profileEditOrganizationMemberSheetTitle,
                  }
                )
              )}
            </SheetTitle>
            <SheetDescription className="text-xs sm:text-sm text-left">
              {_.upperFirst(
                t(
                  memberFormSheetMode === PROFILE_FORM_SHEET_MODES.ADD
                    ? "profileAddOrganizationMemberSheetDescription"
                    : "profileEditOrganizationMemberSheetDescription",
                  {
                    defaultValue:
                      memberFormSheetMode === PROFILE_FORM_SHEET_MODES.ADD
                        ? profileAddOrganizationMemberSheetDescription
                        : profileEditOrganizationMemberSheetDescription,
                  }
                )
              )}
            </SheetDescription>
          </SheetHeader>
        </div>
        <OrganizationMemberFormComponent/>
      </SheetContent>
    </Sheet>
  );
};

export default OrganizationMemberSheetComponent;
