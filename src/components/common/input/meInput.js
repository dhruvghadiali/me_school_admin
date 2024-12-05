import PropTypes from "prop-types";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  inputClassNameByVariant,
  inputMessageClassNameByVariant,
} from "../../../utils/meClassNameWrapper";
import { variants } from "../../../utils/enums";

const MEInput = ({
  required,
  label,
  message,
  inputVariant,
  labelVariant,
  messageVariant,
  ...props
}) => {
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
  inputVariant: PropTypes.objectOf(variants),
  labelVariant: PropTypes.objectOf(variants),
  messageVariant: PropTypes.objectOf(variants),
};

MEInput.defaultProps = {
  required: false,
  label: "",
  message: "",
  inputVariant: variants.PRIMARY,
  labelVariant: variants.PRIMARY,
  messageVariant: variants.PRIMARY,
};

export default MEInput;
