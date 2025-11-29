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

import MEButton from "@MECommonComponents/form/button/meButton";
import AcademicClassForm from "@MEScreenComponents/academicClass/academicClassForm";

const AcademicClassSheet = () => {
  const { isAcademicClassFormSheetOpen, academicClassFormLoader } = useSelector(
    (state) => state.academicClass
  );
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onClick = (status) =>
    dispatch(manageAcademicClassFormSheetStatus(status));

  return (
    <>
      <Sheet
        open={isAcademicClassFormSheetOpen}
        onOpenChange={(open) => {
          // Prevent closing the sheet while form is loading
          if (academicClassFormLoader && open === false) return;
          onClick(open);
        }}
      >
        <SheetTrigger>
          <MEButton buttonVariant={variants.DARK} onClick={() => onClick(true)}>
            <Plus />
            {_.upperFirst(t("addAcademicClassButtonText",{defaultValue: addAcademicClassButtonText}))}
          </MEButton>
        </SheetTrigger>
            <SheetContent
              className="[&>button]:cursor-pointer"
              side={"right"}
            >
              <SheetHeader>
                <SheetTitle>
                  {_.upperFirst(t("addAcademicClassSheetTitle",{defaultValue: addAcademicClassSheetTitle}))}
                </SheetTitle>
                <SheetDescription>
                  {_.upperFirst(t("addAcademicClassSheetDescription",{defaultValue: addAcademicClassSheetDescription}))}
                </SheetDescription>
              </SheetHeader>
              <div className="ml-2 mr-2">
                <AcademicClassForm />
              </div>
            </SheetContent>
      </Sheet>
    </>
  );
};

AcademicClassSheet.propTypes = {};

export default AcademicClassSheet;
