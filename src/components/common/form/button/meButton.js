import { Button } from "@MEShadcnComponents/button";
import { buttonClassNameByVariant } from "@MECommonComponents/form/button/meButtonClassNameWrapper";

import PropTypes from "prop-types";

const MEButton = ({ buttonVariant, ...props }) => {
  return (
    <Button
      className={`${buttonClassNameByVariant(buttonVariant)} cursor-pointer hover:cursor-pointer`}
      {...props}
    />
  );
};

MEButton.propTypes = {
  buttonVariant: PropTypes.string,
};

export default MEButton;
