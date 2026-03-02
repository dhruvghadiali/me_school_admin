import { PlusCircle } from "lucide-react";

import _ from "lodash";

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

const MEActionAlertDialog = (props) => {
    const { children, icon, actions, title, description } = props;
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col max-h-[90vh]">
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4 shrink-0">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-dark"
                        aria-hidden="true"
                    >
                        {icon || <PlusCircle className="text-dark" size={16} />}
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-dark">
                            {title || "Do you want to perform this action?"}
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                </div>
                <AlertDialogDescription asChild className="overflow-y-auto flex-1 min-h-0 pr-1">
                    <div>
                        {description ||
                            "This action cannot be undone. Please confirm if you want to proceed."}
                    </div>
                </AlertDialogDescription>
                <AlertDialogFooter className="shrink-0">
                    {_.map(actions, (action, index) => (
                        <AlertDialogAction
                            key={index}
                            className={`${action.className || ""} hover:cursor-pointer`}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </AlertDialogAction>
                    ))}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

MEActionAlertDialog.propTypes = {};

export default MEActionAlertDialog;
