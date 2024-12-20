import { Button } from "@MEShadcnComponents/button";
import { buttonClassNameByVariant } from "@MECommonComponents/button/meButtonClassNameWrapper";

import PropTypes from "prop-types";

const MEButton = ({ buttonVariant, ...props }) => {
  return (
    <Button
      className={`${buttonClassNameByVariant(buttonVariant)}`}
      {...props}
    />
  );
};

MEButton.propTypes = {
  buttonVariant: PropTypes.string,
};

export default MEButton;
