
import { X } from "lucide-react";

import { Label } from "@MEShadcnComponents/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@MEShadcnComponents/select";
import {
  selectClassNameByVariant,
  selectLabelClassNameByVariant,
  selectMessageClassNameByVariant,
  selectedValueClassNameByVariant,
} from "@MECommonComponents/form/select/meSelectClassNameWrapper";

import _ from "lodash";
import PropTypes from "prop-types";

const MESelect = (props) => {
  const {
    required,
    label,
    items,
    message,
    disabled,
    placeholder,
    labelvariant,
    onValueChange,
    selectVariant,
    selectedValue,
    messagevariant,
    selectedVariant,
    clearable,
  } = props;

  return (
    <>
      <div className="space-y-2">
        <Label className={selectLabelClassNameByVariant(labelvariant)}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
        <div className="relative">
          <Select
            onValueChange={(value) => onValueChange(value)}
            value={selectedValue}
            disabled={disabled}
          >
            <SelectTrigger className={selectClassNameByVariant(selectVariant)}>
              <SelectValue placeholder={_.upperFirst(placeholder)} />
            </SelectTrigger>
            {items && items.length > 0 && (
              <SelectContent>
                {_.map(items, (item, index) => (
                  <SelectItem
                    key={index}
                    value={item.value}
                    className={`${
                      _.toLower(selectedValue) === _.toLower(item.value)
                        ? selectedValueClassNameByVariant(selectedVariant)
                        : ""
                    }`}
                  >
                    {_.upperFirst(item.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
          {clearable && selectedValue && !disabled && (
            <button
              type="button"
              onClick={() => onValueChange("")}
              className="absolute top-1/2 -translate-y-1/2 right-10 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Clear ${label || "selection"}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <p
          className={`mt-2 text-xs ${selectMessageClassNameByVariant(
            messagevariant
          )}`}
          role="alert"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </>
  );
};

MESelect.propTypes = {
  required: PropTypes.bool,
  items: PropTypes.array,
  label: PropTypes.string,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  selectedValue: PropTypes.string,
  selectVariant: PropTypes.string,
  selectedVariant: PropTypes.string,
  labelvariant: PropTypes.string,
  messagevariant: PropTypes.string,
  onValueChange: PropTypes.func,
  clearable: PropTypes.bool,
};

export default MESelect;
