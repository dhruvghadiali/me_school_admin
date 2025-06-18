import { History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@MEShadcnComponents/button";
import { variants } from "@MEUtils/enums";
import { manageFeeLogFormSheetStatus } from "@MERedux/fee/feeSlice";
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

const FeeLogSheet = () => {
  const { isFeeLogFormSheetOpen } = useSelector((state) => state.academicClass);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onClick = (status) => dispatch(manageFeeLogFormSheetStatus(status));

  return (
    <>
      <Sheet open={isFeeLogFormSheetOpen} onOpenChange={(open) => onClick(open)}>
        <SheetTrigger>
          <MEButton buttonVariant={variants.DARK} onClick={() => onClick(true)}>
           
            <History />
            {"View Logs"}
          </MEButton>
        </SheetTrigger>
        <SheetContent side="bottom" className="!h-[80vh] !max-h-none p-4">
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
          <div style={{ height: "700px" }}></div>
        </SheetContent>
      </Sheet>
    </>
  );
};

FeeLogSheet.propTypes = {};

export default FeeLogSheet;
