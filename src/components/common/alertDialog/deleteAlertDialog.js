import { CircleAlert, CircleAlertIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@MEShadcnComponents/alert-dialog";
import { Button } from "@MEShadcnComponents/button";

import PropTypes from "prop-types";

const MEDeleteAlertDialog = (props) => {
  const { children, onConfirm } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-danger"
            aria-hidden="true"
          >
            <CircleAlertIcon className="text-danger" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-danger">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you really want to delete these record? This process cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-danger hover:bg-danger text-secondary" onClick={onConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

MEDeleteAlertDialog.propTypes = {};

export default MEDeleteAlertDialog;
