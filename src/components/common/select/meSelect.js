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
} from "@MECommonComponents/select/meSelectClassNameWrapper";

import _ from "lodash";
import PropTypes from "prop-types";

const MESelect = (props) => {
  const {
    required,
    label,
    items,
    message,
    placeholder,
    selectedValue,
    selectVariant,
    selectedVariant,
    labelVariant,
    messageVariant,
    onValueChange,
  } = props;

  return (
    <>
      <div className="pr-5 space-y-2">
        <Label className={selectLabelClassNameByVariant(labelVariant)}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
        <Select onValueChange={(value) => onValueChange(value)} value={selectedValue}>
          <SelectTrigger className={selectClassNameByVariant(selectVariant)}>
            <SelectValue placeholder={_.upperFirst(placeholder)} />
          </SelectTrigger>
          <SelectContent>
            {_.map(items, (item) => (
              <SelectItem
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
        </Select>
        <p
          className={`mt-2 text-xs ${selectMessageClassNameByVariant(
            messageVariant
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
  labelVariant: PropTypes.string,
  messageVariant: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default MESelect;
