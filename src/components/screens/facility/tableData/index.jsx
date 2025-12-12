import { Trash2, PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { variants } from "@MEUtils/enums";
import { Button } from "@MEShadcnComponents/button";
import { setSelectedFacilityType } from "@MERedux/facility/facilitySlice";
import { addFacility, deleteFacility } from "@MERedux/facility/facilityAction";

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

import MESelect from "@MECommonComponents/form/select/meSelect";
import MEDataTable from "@/components/common/table/meDataTable";
import MEAddAlertDialog from "@MECommonComponents/alertDialog/addAlertDialog";
import MEDeleteAlertDialog from "@MECommonComponents/alertDialog/deleteAlertDialog";

const FacilityScreenTableData = () => {
  const { facilityTypes, selectedFacilityType, facilities } = useSelector(
    (state) => state.facility
  );
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onDeleteConfirm = (data) => {
    if (data && data.id) {
      dispatch(deleteFacility(data.id));
    }
  };

  const onAddConfirm = (data) => {
    if (data && data.facilityId) {
      dispatch(
        addFacility({
          facility: data.facilityId,
        })
      );
    }
  };

  const colDefs = [
    {
      headerName: _.upperFirst(
        t("facilityActionColumnTitle", {
          defaultValue: facilityActionColumnTitle,
        })
      ),
      field: "action",
      cellRenderer: (data) => {
        return data &&
          data.isAvailable &&
          _.toLower(data.isAvailable) === _.toLower("yes") ? (
          <MEDeleteAlertDialog onConfirm={() => onDeleteConfirm(data)}>
            <Button size="icon" variant="link" className="text-danger">
              <Trash2 />
            </Button>
          </MEDeleteAlertDialog>
        ) : (
          <MEAddAlertDialog onConfirm={() => onAddConfirm(data)}>
            <Button size="icon" variant="link" className="text-dark">
              <PlusIcon />
            </Button>
          </MEAddAlertDialog>
        );
      },
      width: 150,
      filter: false,
      sortable: false,
    },
    {
      headerName: _.upperFirst(
        t("facilityNameColumnTitle", { defaultValue: facilityNameColumnTitle })
      ),
      field: "facilityName",
      filter: true,
      sortable: true,
      width: 500,
    },
    {
      headerName: _.upperFirst(
        t("facilityIsAvailableColumnTitle", {
          defaultValue: facilityIsAvailableColumnTitle,
        })
      ),
      field: "isAvailable",
      filter: true,
      sortable: true,
      width: 150,
    },
    {
      headerName: _.upperFirst(
        t("facilityCreatedByColumnTitle", {
          defaultValue: facilityCreatedByColumnTitle,
        })
      ),
      field: "createdBy",
      filter: true,
      sortable: true,
    },
    {
      headerName: _.upperFirst(
        t("facilityCreatedAtColumnTitle", {
          defaultValue: facilityCreatedAtColumnTitle,
        })
      ),
      field: "createdAt",
      filterType: "dateColumnFilter",
      filter: true,
      sortable: true,
    },
    {
      headerName: _.upperFirst(
        t("facilityUpdatedByColumnTitle", {
          defaultValue: facilityUpdatedByColumnTitle,
        })
      ),
      field: "updatedBy",
      filter: true,
      sortable: true,
    },
    {
      headerName: _.upperFirst(
        t("facilityUpdatedAtColumnTitle", {
          defaultValue: facilityUpdatedAtColumnTitle,
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
          <div className="lg:grid lg:grid-flow-row lg:grid-cols-2 mt-5 ml-1 mb-2">
            <div className="xl:w-60 lg:pr-2">
              <MESelect
                label={_.upperFirst(
                  t("selectFacilityTypeLabel", {
                    defaultValue: facilityTypeSelectionLabel,
                  })
                )}
                placeholder={_.upperFirst(
                  t("facilityTypeSelectionPlaceholder", {
                    defaultValue: facilityTypeSelectionPlaceholder,
                  })
                )}
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
      </div>

      <div className="ag-theme-alpine w-full h-[75vh]">
        <MEDataTable
          rows={
            _.find(facilities, { id: selectedFacilityType })?.facilities || []
          }
          columns={colDefs}
        />
      </div>
    </>
  );
};

FacilityScreenTableData.propTypes = {};

export default FacilityScreenTableData;
