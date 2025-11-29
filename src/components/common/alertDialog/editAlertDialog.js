import { Edit } from "lucide-react";

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

const MEEditAlertDialog = (props) => {
  const { children, onConfirm } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-dark"
            aria-hidden="true"
          >
            <Edit className="text-dark" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-dark">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you really want to edit these record?
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-dark hover:bg-dark text-secondary" onClick={onConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

MEEditAlertDialog.propTypes = {};

export default MEEditAlertDialog;
