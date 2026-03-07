import { Trash2, Edit } from "lucide-react";
// import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { Button } from "@MEShadcnComponents/button";
import {
  getSchoolAdmissionDocuments,
  deleteAdmissionDocument,
} from "@MERedux/admissionDocument/admissionDocumentAction";

import {
  setEductionBoard,
  setSelectedAcademicClass,
  setSchoolAdmissionFormData,
  manageSchoolAdmissionFormSheetStatus,
} from "@MERedux/admissionDocument/admissionDocumentSlice";
import {
  eductionBoardSelectionLabel,
  academicClassSelectionLabel,
  eductionBoardSelectionPlaceholder,
  academicClassSelectionPlaceholder,
  admissionDocumentNotesColumnTitle,
  admissionDocumentActionsColumnTitle,
  admissionDocumentCreatedByColumnTitle,
  admissionDocumentCreatedAtColumnTitle,
  admissionDocumentUpdatedByColumnTitle,
  admissionDocumentUpdatedAtColumnTitle,
  admissionDocumentIsRequiredColumnTitle,
  admissionDocumentDocumentNameColumnTitle,
} from "@MELocalization/en";

import _ from "lodash";
import moment from "moment/moment";

import MESelect from "@MECommonComponents/form/select/meSelect";
import MEDataTable from "@/components/common/table/meDataTable";
import AdmissionDocumentSheet from "@MEScreenComponents/admissionDocument/admissionDocumentSheet";
import MEEditAlertDialog from "@MECommonComponents/alertDialog/editAlertDialog";
import MEDeleteAlertDialog from "@MECommonComponents/alertDialog/deleteAlertDialog";

const SchoolAdmissionTableData = () => {
  const {
    selectedAcademicClass,
    selectedEductionBoard,
    schoolAdmissionDocuments,
    eductionBoardsWithAcademicClasses,
  } = useSelector((state) => state.admissionDocument);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onDeleteConfirm = (data) => {
    if (data  && data.id) {
      dispatch(
        deleteAdmissionDocument({
          id: data.id,
          academicClass: selectedAcademicClass,
        })
      );
    }
  };

  const onEditConfirm = (data) => {
    dispatch(
      setSchoolAdmissionFormData({
        ...data,
        isRequired: _.toLower(data.isRequired) === 'required' ? true : false,
        academicClass: selectedAcademicClass,
      })
    );
    dispatch(manageSchoolAdmissionFormSheetStatus(true));
  };

  const onAcademicClassChange = (value) => {
    dispatch(setSelectedAcademicClass(value));
    dispatch(getSchoolAdmissionDocuments({ academicClass: value }));
  };

  const colDefs = [
    {
      headerName: _.upperFirst(
        t("admissionDocumentActionsColumnTitle", {
          defaultValue: admissionDocumentActionsColumnTitle,
        })
      ),
      field: "action",
      cellRenderer: (data) => {
        return (
          <div>
            <MEEditAlertDialog onConfirm={() => onEditConfirm(data)}>
              <Button size="icon" variant="link" className="text-dark">
                <Edit />
              </Button>
            </MEEditAlertDialog>
            <MEDeleteAlertDialog onConfirm={() => onDeleteConfirm(data)}>
              <Button size="icon" variant="link" className="text-danger">
                <Trash2 />
              </Button>
            </MEDeleteAlertDialog>
          </div>
        );
      },
      width: 150,
      filter: false,
      sortable: false,
    },
    {
      headerName: _.upperFirst(
        t("admissionDocumentDocumentNameColumnTitle", {
          defaultValue: admissionDocumentDocumentNameColumnTitle,
        })
      ),
      field: "admissionDocument",
      filter: true,
      sortable: true,
      width: 500,
    },
    {
      headerName: _.upperFirst(
        t("admissionDocumentIsRequiredColumnTitle", {
          defaultValue: admissionDocumentIsRequiredColumnTitle,
        })
      ),
      field: "isRequired",
      filter: true,
      sortable: true,
      width: 150,
    },
    {
      headerName: _.upperFirst(
        t("admissionDocumentNotesColumnTitle", {
          defaultValue: admissionDocumentNotesColumnTitle,
        })
      ),
      field: "notes",
      filter: true,
      sortable: true,
      width: 500,
    },
    {
      headerName: _.upperFirst(
        t("admissionDocumentCreatedByColumnTitle", {
          defaultValue: admissionDocumentCreatedByColumnTitle,
        })
      ),
      field: "createdBy",
      filter: true,
      sortable: true,
    },
    {
      headerName: _.upperFirst(
        t("admissionDocumentCreatedAtColumnTitle", {
          defaultValue: admissionDocumentCreatedAtColumnTitle,
        })
      ),
      field: "createdAt",
      filterType: "dateColumnFilter",
      filter: true,
      sortable: true,
    },
    {
      headerName: _.upperFirst(
        t("admissionDocumentUpdatedByColumnTitle", {
          defaultValue: admissionDocumentUpdatedByColumnTitle,
        })
      ),
      field: "updatedBy",
      filter: true,
    },
    {
      headerName: _.upperFirst(
        t("admissionDocumentUpdatedAtColumnTitle", {
          defaultValue: admissionDocumentUpdatedAtColumnTitle,
        })
      ),
      field: "updatedAt",
      filterType: "dateColumnFilter",
      filter: true,
      sortable: true,
    },
  ];

  return (
    <>
      <div className="lg:grid lg:grid-flow-row lg:grid-cols-2 mt-5 ml-1 mb-2">
        <div className="lg:self-center lg:justify-self-start">
          <div className="lg:grid lg:grid-flow-row lg:grid-cols-2">
            <div className="xl:w-60 lg:pr-2">
              <MESelect
                label={_.upperFirst(
                  t("eductionBoardSelectionLabel", {
                    defaultValue: eductionBoardSelectionLabel,
                  })
                )}
                placeholder={_.upperFirst(
                  t("eductionBoardSelectionPlaceholder", {
                    defaultValue: eductionBoardSelectionPlaceholder,
                  })
                )}
                items={eductionBoardsWithAcademicClasses}
                selectedValue={selectedEductionBoard}
                selectVariant={variants.DARK}
                selectedVariant={variants.DARK}
                labelvariant={variants.DARK}
                onValueChange={(value) => dispatch(setEductionBoard(value))}
              />
            </div>
            <div className="xl:w-60 lg:pl-2">
              <MESelect
                label={_.upperFirst(
                  t("academicClassSelectionLabel", {
                    defaultValue: academicClassSelectionLabel,
                  })
                )}
                placeholder={_.upperFirst(
                  t("academicClassSelectionPlaceholder", {
                    defaultValue: academicClassSelectionPlaceholder,
                  })
                )}
                items={
                  _.find(
                    eductionBoardsWithAcademicClasses,
                    (item) => item.value === selectedEductionBoard
                  )?.children || []
                }
                selectedValue={selectedAcademicClass}
                selectVariant={variants.DARK}
                selectedVariant={variants.DARK}
                labelvariant={variants.DARK}
                onValueChange={(value) => onAcademicClassChange(value)}
              />
            </div>
          </div>
        </div>
        <div className="md:justify-self-end md:self-center md:mt-0 md:mb-0 mb-5 mt-6 ">
          <AdmissionDocumentSheet />
        </div>
      </div>

      <div className="w-full h-[75vh]">
        <MEDataTable rows={schoolAdmissionDocuments} columns={colDefs} />
      </div>
    </>
  );
};

SchoolAdmissionTableData.propTypes = {};

export default SchoolAdmissionTableData;
