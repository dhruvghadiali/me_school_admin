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
  } = props;

  return (
    <>
      <div className="space-y-2">
        <Label className={selectLabelClassNameByVariant(labelvariant)}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
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
};

export default MESelect;
