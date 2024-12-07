import PropTypes from "prop-types";
import { Button } from "../../ui/button";
import { buttonClassNameByVariant } from "./meButtonClassNameWrapper";

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
