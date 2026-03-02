import _ from "lodash";

import { Input } from "@MEShadcnComponents/input";
import { Label } from "@MEShadcnComponents/label";
import { ME_CHECKBOX_COMPONENT_ENUM } from "@MEHelpers/enums";
import {
  checkboxClassNameByVariant,
  checkboxLabelClassNameByVariant,
  checkboxMessageClassNameByVariant,
  checkboxInputLabelClassNameByVariant,
} from "@MECommonComponents/form/checkbox/meCheckboxClassNameWrapper";

// Helper function to get dynamic grid columns based on checkboxList length
const getGridColumnsClass = (listLength) => {
  if (listLength === 0) return "grid-cols-1";
  if (listLength === 1) return "grid-cols-1";
  if (listLength === 2) return "grid-cols-1 sm:grid-cols-2";
  if (listLength === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
};

const MECheckbox = (props) => {
  const {
    required,
    label,
    message,
    onChange,
    leadingIcon,
    disabled = false,
    checkboxList = [],
    labelVariant = ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY,
    checkboxVariant = ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY,
    messageVariant = ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY,
    direction = ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_LIST_DIRECTION.COLUMN,
    checkboxDirection = ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_DIRECTION.LEFT,
  } = props;

  const directionClass =
    direction === ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_LIST_DIRECTION.ROW
      ? "flex flex-row flex-wrap gap-3"
      : `grid ${getGridColumnsClass(checkboxList.length)} gap-3`;

  return (
    <div className="space-y-2">
      <Label className={`${checkboxLabelClassNameByVariant(labelVariant)}`}>
        {label} {required && <span className="text-danger">*</span>}
      </Label>
      <div className={directionClass}>
        {_.map(checkboxList, (checkboxItem, index) => (
          <div
            className={`flex items-center w-full ${checkboxDirection === ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_DIRECTION.RIGHT ? "flex-row-reverse" : ""}`}
            key={index}
          >
            <Input
              type="checkbox"
              id={`checkbox-${checkboxItem?.label}-${index}`}
              name={`checkbox-${checkboxItem?.label}-${index}`}
              checked={checkboxItem?.isSelected || false}
              className={checkboxClassNameByVariant(checkboxVariant)}
              disabled={disabled}
              onChange={(e) => {
                let tempCheckboxList = _.map(checkboxList, (item) => ({
                  ...item,
                }));

                let index = _.findIndex(
                  tempCheckboxList,
                  (item) => item.label === checkboxItem.label,
                );
                if (index !== -1) {
                  tempCheckboxList[index].isSelected =
                    !tempCheckboxList[index].isSelected;
                }
                onChange(tempCheckboxList);
              }}
            />
            <Label
              htmlFor={`checkbox-${checkboxItem?.label}-${index}`}
              className={`${checkboxInputLabelClassNameByVariant(checkboxVariant)} flex-1 w-full`}
            >
              {checkboxItem?.label || "N/A"}
            </Label>
            {direction ===
              ME_CHECKBOX_COMPONENT_ENUM.CHECKBOX_LIST_DIRECTION.ROW &&
              leadingIcon}
          </div>
        ))}
      </div>
      <p
        className={checkboxMessageClassNameByVariant(messageVariant)}
        role="alert"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
};

export default MECheckbox;
