import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { variants } from "@MEUtils/enums";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@MEShadcnComponents/sheet";
import {
  addFacilityButtonText,
  addFacilitySheetTitle,
  addFacilitySheetDescription,
} from "@MELocalization/en";

import _ from "lodash";

import MEButton from "@MECommonComponents/button/meButton";
import FacilityForm from "@MEScreenComponents/facility/facilityForm";

const FacilitySheet = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <MEButton buttonVariant={variants.DARK}>
            <Plus />
            {i18n.exists("addFacilityButtonText")
              ? _.upperFirst(t("addFacilityButtonText"))
              : _.upperFirst(addFacilityButtonText)}
          </MEButton>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>
              {i18n.exists("addFacilitySheetTitle")
                ? _.upperFirst(t("addFacilitySheetTitle"))
                : _.upperFirst(addFacilitySheetTitle)}
            </SheetTitle>
            <SheetDescription>
              {i18n.exists("addFacilitySheetDescription")
                ? _.upperFirst(t("addFacilitySheetDescription"))
                : _.upperFirst(addFacilitySheetDescription)}
            </SheetDescription>
          </SheetHeader>
          <div className="h-full overflow-y-auto ">
            <FacilityForm />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

FacilitySheet.propTypes = {};

export default FacilitySheet;
