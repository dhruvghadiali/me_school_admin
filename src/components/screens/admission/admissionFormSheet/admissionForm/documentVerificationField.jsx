import {
  FileSearch2Icon,
  CheckCircle2Icon,
  ChevronRightIcon,
  FileClockIcon,
} from "lucide-react";
import { Label } from "@MEShadcnComponents/label";

import _ from "lodash";

import { ME_CHECKBOX_COMPONENT_ENUM } from "@MEHelpers/enums";
import MECheckbox from "@MECommonComponents/form/checkbox";
import MEActionAlertDialog from "@MECommonComponents/alertDialog/actionAlertDialog";

// ---------------------------------------------------------------------------
// Sub-component: Document Verification Field
// ---------------------------------------------------------------------------

const DocumentVerificationFieldComponent = ({
  documentList,
  onDocumentListChange,
  disabled,
  error,
}) => {
  const verifiedCount = _.size(_.filter(documentList, (doc) => doc.isSelected));
  const totalCount = _.size(documentList);
  const allVerified = verifiedCount === totalCount && totalCount > 0;

  const handleCheckboxChange = (updated) => {
    onDocumentListChange(
      _.map(documentList, (doc) => {
        const found = _.find(updated, (u) => u.label === doc.label);
        return found ? { ...doc, isSelected: found.isSelected } : doc;
      }),
    );
  };

  const requiredDocs = _.filter(documentList, (doc) => doc.isRequired);
  const optionalDocs = _.filter(documentList, (doc) => !doc.isRequired);

  const dialogDescription =
    totalCount > 0 ? (
      <div className="space-y-4">
        {_.size(requiredDocs) > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-danger uppercase tracking-wide">
              Required Documents ({_.size(requiredDocs)})
            </p>
            <MECheckbox
              label=""
              disabled={false}
              direction={ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_LIST_DIRECTION.ROW}
              checkboxDirection={
                ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_DIRECTION.RIGHT
              }
              labelVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              messageVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxList={requiredDocs}
              leadingIcon={<FileClockIcon className="text-primary" size={15} />}
              onChange={handleCheckboxChange}
            />
          </div>
        )}
        {_.size(optionalDocs) > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Optional Documents ({_.size(optionalDocs)})
            </p>
            <MECheckbox
              label=""
              disabled={false}
              direction={ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_LIST_DIRECTION.ROW}
              checkboxDirection={
                ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_DIRECTION.RIGHT
              }
              labelVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              messageVariant={ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY}
              checkboxList={optionalDocs}
              leadingIcon={<FileClockIcon className="text-primary" size={15} />}
              onChange={handleCheckboxChange}
            />
          </div>
        )}
      </div>
    ) : (
      <span>No documents uploaded for this application.</span>
    );

  return (
    <div className="space-y-2">
      <Label className="text-primary">Document Verification</Label>

      <MEActionAlertDialog
        icon={<FileSearch2Icon className="text-primary" size={20} />}
        title="Document Verification"
        description={dialogDescription}
        actions={[
          {
            label: "Cancel",
            className: "bg-primary hover:bg-primary/90 text-white",
            onClick: () => {},
          },
          {
            label: "Confirm Verification",
            className: "bg-success hover:bg-success/90 text-white",
            onClick: () => {},
          },
        ]}
      >
        <button
          type="button"
          disabled={disabled}
          className="flex w-full items-center justify-between rounded-md border border-primary/80 bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 disabled:opacity-50"
        >
          <span className="flex items-center gap-2 text-primary/80">
            <FileSearch2Icon size={15} className="text-primary shrink-0" />
            {verifiedCount > 0
              ? `${verifiedCount} of ${totalCount} documents verified`
              : "Click to verify documents"}
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            {allVerified ? (
              <CheckCircle2Icon size={15} className="text-success" />
            ) : (
              <ChevronRightIcon size={15} className="text-primary/60" />
            )}
          </span>
        </button>
      </MEActionAlertDialog>

      {error && (
        <p className="text-xs text-danger" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      <p className="mt-2 mb-5 text-xs text-primary flex flex-wrap gap-x-3 gap-y-0.5">
        <span>
          <span className="font-semibold">{totalCount}</span> total
        </span>
        <span className="text-danger">
          <span className="font-semibold">{_.size(requiredDocs)}</span> required
        </span>
        <span className="text-muted-foreground">
          <span className="font-semibold">{_.size(optionalDocs)}</span> optional
        </span>
        <span className="text-success">
          <span className="font-semibold">{verifiedCount}</span> verified
        </span>
      </p>
    </div>
  );
};

export default DocumentVerificationFieldComponent;