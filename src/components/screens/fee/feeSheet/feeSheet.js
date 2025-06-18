import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { manageFeeFormSheetStatus } from "@MERedux/fee/feeSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@MEShadcnComponents/sheet";
import {
  addFeeButtonText,
  addFeeSheetTitle,
  addFeeSheetDescription,
} from "@MELocalization/en";

import _ from "lodash";

import MEButton from "@MECommonComponents/button/meButton";
import FeeForm from "@MEScreenComponents/fee/feeForm";

const FeeSheet = () => {
  const { isFeeFormSheetOpen } = useSelector(
    (state) => state.academicClass
  );
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onClick = (status) =>
    dispatch(manageFeeFormSheetStatus(status));

  return (
    <>
      <Sheet
        open={isFeeFormSheetOpen}
        onOpenChange={(open) => onClick(open)}
      >
        <SheetTrigger>
          <MEButton buttonVariant={variants.DARK} onClick={() => onClick(true)}>
            <Plus />
            {i18n.exists("addFeeButtonText")
              ? _.upperFirst(t("addFeeButtonText"))
              : _.upperFirst(addFeeButtonText)}
          </MEButton>
        </SheetTrigger>
        <SheetContent side="right" className="!w-[30vw] !max-w-none p-4">
           <SheetHeader>
            <SheetTitle>
              {i18n.exists("addFeeSheetTitle")
                ? _.upperFirst(t("addFeeSheetTitle"))
                : _.upperFirst(addFeeSheetTitle)}
            </SheetTitle>
             <SheetDescription>
              {i18n.exists("addFeeSheetDescription")
                ? _.upperFirst(t("addFeeSheetDescription"))
                : _.upperFirst(addFeeSheetDescription)}
            </SheetDescription>
           </SheetHeader>
          <div className="h-full overflow-y-auto ">
            <FeeForm />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

FeeSheet.propTypes = {};

export default FeeSheet;
