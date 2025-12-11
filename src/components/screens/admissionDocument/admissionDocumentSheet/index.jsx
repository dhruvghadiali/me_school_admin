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

import MEButton from "@MECommonComponents/form/button/meButton";
import AdmissionDocumentForm from "@MEScreenComponents/admissionDocument/admissionDocumentForm";

const AdmissionDocumentSheet = () => {
  const {
    isSchoolAdmissionFormSheetOpen,
    selectedAcademicClass,
    schoolAdmissionFormData,
  } = useSelector((state) => state.admissionDocument);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onClick = (status) => {
    dispatch(manageSchoolAdmissionFormSheetStatus(status));
    dispatch(
      setSchoolAdmissionFormData({
        id: "",
        academicClass: selectedAcademicClass,
        admissionDocumentValue: "",
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
            {_.upperFirst(t("addAdmissionDocumentButtonText", { defaultValue: addAdmissionDocumentButtonText }))}
          </MEButton>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>
              {schoolAdmissionFormData.id
                ? _.upperFirst(t("editAdmissionDocumentSheetTitle", { defaultValue: editAdmissionDocumentSheetTitle }))
                : _.upperFirst(t("addAdmissionDocumentSheetTitle", { defaultValue: addAdmissionDocumentSheetTitle }))}
            </SheetTitle>
            <SheetDescription>
              {schoolAdmissionFormData.id
                ? _.upperFirst(t("editAdmissionDocumentSheetDescription", { defaultValue: editAdmissionDocumentSheetDescription }))
                : _.upperFirst(t("addAdmissionDocumentSheetDescription", { defaultValue: addAdmissionDocumentSheetDescription }))}
            </SheetDescription>
          </SheetHeader>
          <div className="ml-2 mr-2"><AdmissionDocumentForm /></div>
        </SheetContent>
      </Sheet>
    </>
  );
};

AdmissionDocumentSheet.propTypes = {};

export default AdmissionDocumentSheet;
