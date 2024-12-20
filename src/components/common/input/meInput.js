import { Input } from "@MEShadcnComponents/input";
import { Label } from "@MEShadcnComponents/label";
import {
  inputClassNameByVariant,
  inputMessageClassNameByVariant,
} from "@MECommonComponents/input/meInputClassNameWrapper";

import PropTypes from "prop-types";

const MEInput = (props) => {
  const {
    required,
    label,
    message,
    inputVariant,
    labelVariant,
    messageVariant,
  } = props;

  return (
    <div className="space-y-2">
      <Label className={inputMessageClassNameByVariant(labelVariant)}>
        {label} {required && <span className="text-danger">*</span>}
      </Label>
      <div className="relative">
        <Input
          className={`${inputClassNameByVariant(inputVariant)}`}
          {...props}
        />
      </div>
      <p
        className={`mt-2 text-xs ${inputMessageClassNameByVariant(
          messageVariant
        )}`}
        role="alert"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
};

MEInput.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  message: PropTypes.string,
  inputVariant: PropTypes.string,
  labelVariant: PropTypes.string,
  messageVariant: PropTypes.string,
};

export default MEInput;
