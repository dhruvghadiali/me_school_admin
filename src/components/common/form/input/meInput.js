import { Input } from "@MEShadcnComponents/input";
import { Label } from "@MEShadcnComponents/label";
import {
  inputClassNameByVariant,
  inputMessageClassNameByVariant,
} from "@MECommonComponents/form/input/meInputClassNameWrapper";

import PropTypes from "prop-types";

const MEInput = (props) => {
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
          className={`${inputClassNameByVariant(inputvariant)}`}
          {...props}
        />
      </div>
      <p
        className={`mt-2 mb-5 text-xs ${inputMessageClassNameByVariant(
          messagevariant
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
  inputvariant: PropTypes.string,
  labelvariant: PropTypes.string,
  messagevariant: PropTypes.string,
};

export default MEInput;
