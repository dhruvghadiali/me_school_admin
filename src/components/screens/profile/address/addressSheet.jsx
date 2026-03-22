import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";

import { setAddressFormSheetStatus } from "@MERedux/profile/profileSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@MEShadcnComponents/sheet";
import {
  profileEditAddressSheetTitle,
  profileEditAddressSheetDescription,
} from "@MELocalization/en";

import AddressFormComponent from "@MEScreenComponents/profile/address/addressForm";

const AddressSheetComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { addressFormSheetOpen } = useSelector((state) => state.profile);

  // Function to toggle the sheet open/close status
  const toggleSheet = (status) => {
    dispatch(setAddressFormSheetStatus(status));
  };

  return (
    <Sheet open={addressFormSheetOpen} onOpenChange={toggleSheet}>
      <SheetContent
        side="bottom"
        className="h-full w-full overflow-hidden flex flex-col p-0"
      >
        {/* Sheet Header */}
        <div className="border-b border-primary/50 px-4 sm:px-6 md:px-8 shadow-lg shadow-primary/80">
          <SheetHeader className="space-y-1 sm:space-y-1.5 p-1 m-2">
            <SheetTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-left m-0 p-0">
              {t("profileEditAddressSheetTitle", {
                  defaultValue: profileEditAddressSheetTitle,
                })
                .split(" ")
                .map((word) => _.upperFirst(word))
                .join(" ")}
            </SheetTitle>
            <SheetDescription className="text-xs sm:text-sm text-left">
              {_.upperFirst(
                t("profileEditAddressSheetDescription", {
                  defaultValue: profileEditAddressSheetDescription,
                }),
              )}
            </SheetDescription>
          </SheetHeader>
        </div>
        <AddressFormComponent />
      </SheetContent>
    </Sheet>
  );
};

export default AddressSheetComponent;
