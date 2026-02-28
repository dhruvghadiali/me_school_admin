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
            <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
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
                        <AlertDialogDescription asChild>
                            <span>
                                {description ||
                                    "This action cannot be undone. Please confirm if you want to proceed."}
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
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
