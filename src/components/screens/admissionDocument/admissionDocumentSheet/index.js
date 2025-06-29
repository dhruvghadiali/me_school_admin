import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import {
  manageSchoolAdmissionFormSheetStatus,
  setSchoolAdmissionFormData,
} from "@MERedux/admissionDocument/admissionDocumentSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@MEShadcnComponents/sheet";
import {
  addAdmissionDocumentButtonText,
  addAdmissionDocumentSheetTitle,
  editAdmissionDocumentSheetTitle,
  addAdmissionDocumentSheetDescription,
  editAdmissionDocumentSheetDescription,
} from "@MELocalization/en";

import _ from "lodash";

import MEButton from "@MECommonComponents/button/meButton";
import AdmissionDocumentForm from "@MEScreenComponents/admissionDocument/admissionDocumentForm";

const AdmissionDocumentSheet = () => {
  const {
    isSchoolAdmissionFormSheetOpen,
    selectedAcademicClass,
    schoolAdmissionFormData,
  } = useSelector((state) => state.admissionDocument);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onClick = (status) => {
    dispatch(manageSchoolAdmissionFormSheetStatus(status));
    dispatch(
      setSchoolAdmissionFormData({
        id: "",
        academicClass: selectedAcademicClass,
        admissionDocument: "",
        isRequired: true,
        notes: "",
      })
    );
  };

  return (
    <>
      <Sheet
        open={isSchoolAdmissionFormSheetOpen}
        onOpenChange={(open) => onClick(open)}
      >
        <SheetTrigger>
          <MEButton buttonVariant={variants.DARK} onClick={() => onClick(true)}>
            <Plus />
            {i18n.exists("addAdmissionDocumentButtonText")
              ? _.upperFirst(t("addAdmissionDocumentButtonText"))
              : _.upperFirst(addAdmissionDocumentButtonText)}
          </MEButton>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>
              {schoolAdmissionFormData.id
                ? i18n.exists("editAdmissionDocumentSheetTitle")
                  ? _.upperFirst(t("editAdmissionDocumentSheetTitle"))
                  : _.upperFirst(editAdmissionDocumentSheetTitle)
                : i18n.exists("addAdmissionDocumentSheetTitle")
                ? _.upperFirst(t("addAdmissionDocumentSheetTitle"))
                : _.upperFirst(addAdmissionDocumentSheetTitle)}
            </SheetTitle>
            <SheetDescription>
              {schoolAdmissionFormData.id
                ? i18n.exists("editAdmissionDocumentSheetDescription")
                  ? _.upperFirst(t("editAdmissionDocumentSheetDescription"))
                  : _.upperFirst(editAdmissionDocumentSheetDescription)
                : i18n.exists("addAdmissionDocumentSheetDescription")
                ? _.upperFirst(t("addAdmissionDocumentSheetDescription"))
                : _.upperFirst(addAdmissionDocumentSheetDescription)}
            </SheetDescription>
          </SheetHeader>
          <div className="h-full overflow-y-auto "><AdmissionDocumentForm /></div>
        </SheetContent>
      </Sheet>
    </>
  );
};

AdmissionDocumentSheet.propTypes = {};

export default AdmissionDocumentSheet;
