import { forwardRef } from "react";

import { Input } from "@MEShadcnComponents/input";
import { Label } from "@MEShadcnComponents/label";
import {
  inputClassNameByVariant,
  inputMessageClassNameByVariant,
} from "@MECommonComponents/form/input/meInputClassNameWrapper";

import PropTypes from "prop-types";

const MEInput = forwardRef((props, ref) => {
  const {
    required,
    label,
    message,
    inputvariant,
    labelvariant,
    messagevariant,
  } = props;

  return (
    <div className="space-y-2">
      <Label className={inputMessageClassNameByVariant(labelvariant)}>
        {label} {required && <span className="text-danger">*</span>}
      </Label>
      <div className="relative">
        <Input
          ref={ref}
          className={`${inputClassNameByVariant(inputvariant)}`}
          {...props}
        />
      </div>
      <p
        className={`mt-2 mb-5 text-xs ${inputMessageClassNameByVariant(
          messagevariant,
        )}`}
        role="alert"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
});

MEInput.displayName = "MEInput";

MEInput.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  message: PropTypes.string,
  inputvariant: PropTypes.string,
  labelvariant: PropTypes.string,
  messagevariant: PropTypes.string,
};

export default MEInput;
