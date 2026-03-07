import { AlertTriangle } from "lucide-react";
import PropTypes from "prop-types";
import _ from "lodash";

import { variants } from "@MEUtils/enums";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import MEActionAlertDialog from "@MECommonComponents/alertDialog/actionAlertDialog";

// ---------------------------------------------------------------------------
// Submit action bar with confirmation dialog
// ---------------------------------------------------------------------------

const AdmissionFormActions = ({ nextStatus, admissionFormLoader, onConfirm }) => {
  const alertConfig = {
    icon: <AlertTriangle className="text-primary" size={20} />,
    title: "Are you sure?",
    description: (
      <span>
        You are about to change the application status to{" "}
        <span className="font-semibold text-primary">
          {nextStatus ? _.startCase(nextStatus) : "N/A"}
        </span>
        . Please confirm to proceed.
      </span>
    ),
    actions: [
      {
        label: "Cancel",
        className: "bg-primary hover:bg-primary/90 text-white",
        onClick: () => {},
      },
      {
        label: "Confirm",
        className: "bg-success hover:bg-success/90 text-white",
        onClick: onConfirm,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-3 pt-5 border-t border-primary/20">
      <p className="text-xs sm:text-sm text-muted-foreground">
        Please review the changes before submitting
      </p>
      <div className="flex items-center">
        <MEActionAlertDialog {...alertConfig}>
          <MEButton
            buttonVariant={variants.SUCCESS}
            type="button"
            disabled={admissionFormLoader}
            buttonClassName="w-full sm:w-auto px-6 sm:px-8"
          >
            {admissionFormLoader && <MELoaderIcon />} Change Status
          </MEButton>
        </MEActionAlertDialog>
      </div>
    </div>
  );
};

AdmissionFormActions.propTypes = {
  nextStatus: PropTypes.string,
  admissionFormLoader: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
};

export default AdmissionFormActions;
