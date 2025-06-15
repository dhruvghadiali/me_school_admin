import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { manageAcademicClassFormSheetStatus } from "@MERedux/academicClass/academicClassSlice";
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
import AcademicClassForm from "@MEScreenComponents/academicClass/academicClassForm";

const FeeSheet = () => {
  const { isAcademicClassFormSheetOpen } = useSelector(
    (state) => state.academicClass
  );
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onClick = (status) =>
    dispatch(manageAcademicClassFormSheetStatus(status));

  return (
    <>
      <Sheet
        open={isAcademicClassFormSheetOpen}
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
        <SheetContent>
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
              <AcademicClassForm />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

FeeSheet.propTypes = {};

export default FeeSheet;
