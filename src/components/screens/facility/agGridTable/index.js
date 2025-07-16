import { Trash2 } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { Button } from "@MEShadcnComponents/button";
import { setSelectedFacilityType } from "@MERedux/facility/facilitySlice";

import {
  facilityTypeSelectionLabel,
  facilityTypeSelectionPlaceholder,
  facilityNameColumnTitle,
  facilityActionColumnTitle,
  facilityCreatedByColumnTitle,
  facilityCreatedAtColumnTitle,
  facilityUpdatedAtColumnTitle,
  facilityUpdatedByColumnTitle,
  facilityIsAvailableColumnTitle,
} from "@MELocalization/en";

import _ from "lodash";
import moment from "moment/moment";

import MESelect from "@MECommonComponents/select/meSelect";
import FacilitySheet from "@MEScreenComponents/facility/facilitySheet";
import MEDeleteAlertDialog from "@MECommonComponents/alertDialog/deleteAlertDialog";

const FacilityScreenAGGridTable = () => {
  const { facilityTypes, selectedFacilityType, facilities } = useSelector(
    (state) => state.facility
  );
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const onDeleteConfirm = (data) => {
    if (data && data.data && data.data.id) {
      // dispatch(
      //   deleteAdmissionDocument({
      //     id: data.data.id,
      //     academicClass: selectedAcademicClass,
      //   })
      // );
    }
  };

  const colDefs = [
    {
      headerName: i18n.exists("facilityActionColumnTitle")
        ? _.upperFirst(t("facilityActionColumnTitle"))
        : _.upperFirst(facilityActionColumnTitle),
      field: "action",
      cellRenderer: (data) => {
        return data &&
          data.data &&
          data.data.isAvailable &&
          _.toLower(data.data.isAvailable) === _.toLower("yes") ? (
          <MEDeleteAlertDialog onConfirm={() => onDeleteConfirm(data)}>
            <Button size="icon" variant="link" className="text-danger">
              <Trash2 />
            </Button>
          </MEDeleteAlertDialog>
        ) : (
          <div />
        );
      },
      width: 150,
      filter: false,
      sortable: false,
    },
    {
      headerName: i18n.exists("facilityNameColumnTitle")
        ? _.upperFirst(t("facilityNameColumnTitle"))
        : _.upperFirst(facilityNameColumnTitle),
      field: "facilityName",
      filter: true,
      width: 500,
    },
    {
      headerName: i18n.exists("facilityIsAvailableColumnTitle")
        ? _.upperFirst(t("facilityIsAvailableColumnTitle"))
        : _.upperFirst(facilityIsAvailableColumnTitle),
      field: "isAvailable",
      filter: true,
      width: 150,
    },
    {
      headerName: i18n.exists("facilityCreatedByColumnTitle")
        ? _.upperFirst(t("facilityCreatedByColumnTitle"))
        : _.upperFirst(facilityCreatedByColumnTitle),
      field: "createdBy",
      filter: true,
    },
    {
      headerName: i18n.exists("facilityCreatedAtColumnTitle")
        ? _.upperFirst(t("facilityCreatedAtColumnTitle"))
        : _.upperFirst(facilityCreatedAtColumnTitle),
      field: "createdAt",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          if (!cellValue) return -1;
          const cellDate = moment(cellValue, "DD MMM YYYY")
            .startOf("day")
            .toDate();
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
          return 0;
        },
      },
    },
    {
      headerName: i18n.exists("facilityUpdatedByColumnTitle")
        ? _.upperFirst(t("facilityUpdatedByColumnTitle"))
        : _.upperFirst(facilityUpdatedByColumnTitle),
      field: "updatedBy",
      filter: true,
    },
    {
      headerName: i18n.exists("facilityUpdatedAtColumnTitle")
        ? _.upperFirst(t("facilityUpdatedAtColumnTitle"))
        : _.upperFirst(facilityUpdatedAtColumnTitle),
      field: "updatedAt",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          if (!cellValue) return -1;
          const cellDate = moment(cellValue, "DD MMM YYYY")
            .startOf("day")
            .toDate();
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
          return 0;
        },
      },
    },
  ];

  return (
    <>
      <div className="lg:grid lg:grid-flow-row lg:grid-cols-2 mt-5 ml-1 mb-2">
        <div className="lg:self-center lg:justify-self-start">
          <div className="lg:grid lg:grid-flow-row lg:grid-cols-2 mt-5 ml-1 mb-2">
            <div className="xl:w-60 lg:pr-2">
              <MESelect
                label={
                  i18n.exists("facilityTypeSelectionLabel")
                    ? _.upperFirst(t("facilityTypeSelectionLabel"))
                    : _.upperFirst(facilityTypeSelectionLabel)
                }
                placeholder={
                  i18n.exists("facilityTypeSelectionPlaceholder")
                    ? _.upperFirst(t("facilityTypeSelectionPlaceholder"))
                    : _.upperFirst(facilityTypeSelectionPlaceholder)
                }
                items={facilityTypes}
                selectedValue={selectedFacilityType}
                selectVariant={variants.DARK}
                selectedVariant={variants.DARK}
                labelvariant={variants.DARK}
                onValueChange={(value) =>
                  dispatch(setSelectedFacilityType(value))
                }
              />
            </div>
          </div>
        </div>
        <div className="justify-self-end self-center lg:mt-0 lg:mb-0 mb-5 mt-6 ">
          <div className="w-30 pl-2">
            <FacilitySheet />
          </div>
        </div>
      </div>

      <div className="ag-theme-alpine w-full h-[75vh]">
        <AgGridReact
          rowData={
            _.find(facilities, { id: selectedFacilityType })?.facilities || []
          }
          columnDefs={colDefs}
          pagination={true}
        />
      </div>
    </>
  );
};

FacilityScreenAGGridTable.propTypes = {};

export default FacilityScreenAGGridTable;
