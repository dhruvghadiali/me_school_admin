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
  addAcademicClassButtonText,
  addAcademicClassSheetTitle,
  addAcademicClassSheetDescription,
} from "@MELocalization/en";

import _ from "lodash";

import MEButton from "@MECommonComponents/button/meButton";
import AcademicClassForm from "@MEScreenComponents/academicClass/academicClassForm";

const AcademicClassSheet = () => {
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
            {i18n.exists("addAcademicClassButtonText")
              ? _.upperFirst(t("addAcademicClassButtonText"))
              : _.upperFirst(addAcademicClassButtonText)}
          </MEButton>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {i18n.exists("addAcademicClassSheetTitle")
                ? _.upperFirst(t("addAcademicClassSheetTitle"))
                : _.upperFirst(addAcademicClassSheetTitle)}
            </SheetTitle>
            <SheetDescription>
              {i18n.exists("addAcademicClassSheetDescription")
                ? _.upperFirst(t("addAcademicClassSheetDescription"))
                : _.upperFirst(addAcademicClassSheetDescription)}
              <AcademicClassForm />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

AcademicClassSheet.propTypes = {};

export default AcademicClassSheet;
