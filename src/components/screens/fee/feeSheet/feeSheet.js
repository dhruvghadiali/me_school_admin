import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { manageFeeFormSheetStatus, setFeeFormData } from "@MERedux/fee/feeSlice";
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
  editFeeSheetTitle,
  addFeeSheetDescription,
  editFeeSheetDescription,
} from "@MELocalization/en";

import _ from "lodash";

import MEButton from "@MECommonComponents/button/meButton";
import FeeForm from "@MEScreenComponents/fee/feeForm";

const FeeSheet = () => {
  const { isFeeFormSheetOpen, feeFormData, selectedAcademicClass } = useSelector((state) => state.fee);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onClick = (status) => {
    dispatch(manageFeeFormSheetStatus(status));
    dispatch(setFeeFormData({
      id: "",
      academicClass: selectedAcademicClass,
      feeTypeValue: "",
      monthlyFee: 0,
      quarterlyFee: 0,
      halfYearlyFee: 0,
      yearlyFee: 0,
    }));
  };

  return (
    <>
      <Sheet open={isFeeFormSheetOpen} onOpenChange={(open) => onClick(open)}>
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
              {feeFormData.id
                ? i18n.exists("editFeeSheetTitle")
                  ? _.upperFirst(t("editFeeSheetTitle"))
                  : _.upperFirst(editFeeSheetTitle)
                : i18n.exists("addFeeSheetTitle")
                ? _.upperFirst(t("addFeeSheetTitle"))
                : _.upperFirst(addFeeSheetTitle)}
            </SheetTitle>
            <SheetDescription>
              {feeFormData.id
                ? i18n.exists("editFeeSheetDescription")
                  ? _.upperFirst(t("editFeeSheetDescription"))
                  : _.upperFirst(editFeeSheetDescription)
                : i18n.exists("addFeeSheetDescription")
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
