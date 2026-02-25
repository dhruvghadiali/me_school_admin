import { Button } from "@MEShadcnComponents/button";
import { buttonClassNameByVariant } from "@MECommonComponents/form/button/meButtonClassNameWrapper";

import PropTypes from "prop-types";

const MEButton = ({ buttonVariant, buttonClassName, ...props }) => {
  return (
    <Button
      disabled={props.disabled}
      className={`${buttonClassNameByVariant(buttonVariant)} ${buttonClassName} cursor-pointer hover:cursor-pointer`}
      {...props}
    />
  );
};

MEButton.propTypes = {
  buttonVariant: PropTypes.string,
  buttonClassName: PropTypes.string,
};

export default MEButton;
