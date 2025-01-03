import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import { Label } from "@MEShadcnComponents/label";
import { Eye, ListFilterIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { formateStringWithLodash } from "@MEUtils/utilityFunctions";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";

import {
  admissionForm,
  documentVerificationList,
} from "@MERedux/admission/admissionAction";
import {
  setApplicationFormDetail,
  setApplicationStatusFilter,
  setAdmissionScreenContainerType,
} from "@MERedux/admission/admissionSlice";
import {
  variants,
  admissionScreenContainerType,
  admissionScreenApplicationStatus,
  admissionScreenApplicationFormDetailStatus,
} from "@MEUtils/enums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@MEShadcnComponents/dropdown-menu";

import _ from "lodash";
import moment from "moment/moment";
import MEBadge from "@MECommonComponents/badge/meBadge";
import MEButton from "@MECommonComponents/button/meButton";

const AdmissionScreenAGGridTable = () => {
  const { tableData, applicationStatus } = useSelector(
    (state) => state.admission
  );
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [colDefs, setColDefs] = useState([
    {
      headerName: i18n.exists("admissionTableActionColumnTitle")
        ? _.startCase(t("admissionTableActionColumnTitle"))
        : _.startCase(admissionHub.admissionTableActionColumnTitle),
      cellRenderer: (data) => (
        <MEButton
          size="icon"
          variant="link"
          className="text-dark"
          onClick={() => onViewAdmissionFormDetail(data)}
        >
          <Eye />
        </MEButton>
      ),
      width: 80,
      filter: false,
      sortable: false,
    },
    {
      headerName: i18n.exists("admissionTableAppointmentDateColumnTitle")
        ? _.startCase(t("admissionTableAppointmentDateColumnTitle"))
        : _.startCase(admissionHub.admissionTableAppointmentDateColumnTitle),
      field: "appointmentDate",
      width: 200,
      filter: "agDateColumnFilter",
      cellRenderer: (data) => {
        return data.value && moment(data.value).isValid()
          ? moment(data.value).format("DD MMMM YYYY")
          : "N/A";
      },
    },
    {
      headerName: i18n.exists("admissionTableApplicationNumberColumnTitle")
        ? _.startCase(t("admissionTableApplicationNumberColumnTitle"))
        : _.startCase(admissionHub.admissionTableApplicationNumberColumnTitle),
      field: "applicationNumber",
      filter: true,
      width: 400,
    },
    {
      headerName: i18n.exists("admissionTableApplicationStatusColumnTitle")
        ? _.startCase(t("admissionTableApplicationStatusColumnTitle"))
        : _.startCase(admissionHub.admissionTableApplicationStatusColumnTitle),
      field: "applicationStatus",
      filter: true,
      width: 180,
      cellRenderer: (data) => {
        return data.value ? _.upperCase(data.value) : "N/A";
      },
    },
    {
      headerName: i18n.exists("admissionTableStudentNameColumnTitle")
        ? _.startCase(t("admissionTableStudentNameColumnTitle"))
        : _.startCase(admissionHub.admissionTableStudentNameColumnTitle),
      field: "studentName",
      filter: true,
      width: 550,
      cellRenderer: (data) => {
        return data.value ? _.startCase(data.value) : "N/A";
      },
    },
    {
      headerName: i18n.exists("admissionTableGradeColumnTitle")
        ? _.startCase(t("admissionTableGradeColumnTitle"))
        : _.startCase(admissionHub.admissionTableGradeColumnTitle),
      field: "grade",
      filter: true,
      width: 170,
      cellRenderer: (data) => {
        return data.value ? _.upperCase(data.value) : "N/A";
      },
    },
    {
      headerName: i18n.exists("admissionTableRegistrationDateColumnTitle")
        ? _.startCase(t("admissionTableRegistrationDateColumnTitle"))
        : _.startCase(admissionHub.admissionTableRegistrationDateColumnTitle),
      field: "registrationDate",
      width: 200,
      filter: "agDateColumnFilter",
      cellRenderer: (data) => {
        return data.value && moment(data.value).isValid()
          ? moment(data.value).format("DD MMMM YYYY")
          : "N/A";
      },
    },
  ]);

  const onViewAdmissionFormDetail = (data) => {
    if (
      data &&
      data.data &&
      data.data.appointmentDate &&
      _.toLower(data.data.applicationStatus) ===
        _.toLower(admissionScreenApplicationFormDetailStatus.PENDING)
    ) {
      dispatch(documentVerificationList());
    }
    dispatch(setApplicationFormDetail(data.data));
    dispatch(
      setAdmissionScreenContainerType(
        admissionScreenContainerType.FORMDETAILCARD
      )
    );
  };

  const onFilterOptionChange = (status) => {
    dispatch(setApplicationStatusFilter(status));
    dispatch(admissionForm());
  };

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2 mt-5 ml-1 mb-2">
        <div className="self-center">
          <Label>
            {i18n.exists("admissionTableTitle")
              ? _.startCase(t("admissionTableTitle"))
              : _.startCase(admissionHub.admissionTableTitle)}{" "}
          </Label>
          <MEBadge badgeVariant={variants.PRIMARY}>
            {_.upperCase(applicationStatus)}
          </MEBadge>
        </div>
        <div className="justify-self-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full bg-primary">
              <MEButton
                className="rounded-full bg-dark"
                variant="icon"
                size="icon"
                aria-label="Filter"
              >
                <ListFilterIcon
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="text-secondary"
                />
              </MEButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-10">
              <DropdownMenuLabel>
                {i18n.exists("admissionTableDropdownTitle")
                  ? _.startCase(t("admissionTableDropdownTitle"))
                  : _.startCase(admissionHub.admissionTableDropdownTitle)}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {_.map(admissionScreenApplicationStatus, (status) => (
                  <DropdownMenuItem
                    className={`${
                      applicationStatus == status ? "text-primary" : "text-dark"
                    }`}
                    onClick={() => onFilterOptionChange(status)}
                  >
                    {formateStringWithLodash(status, _.startCase)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="ag-theme-alpine w-full h-[80vh]">
        <AgGridReact
          rowData={tableData}
          columnDefs={colDefs}
          pagination={true}
        />
      </div>
    </>
  );
};

AdmissionScreenAGGridTable.propTypes = {};

export default AdmissionScreenAGGridTable;
