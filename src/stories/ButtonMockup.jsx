import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "../components/ui/button";
import '../styles/globals.css';

export const ButtonMockup = ({children, variant, size, disabled, onClick }) => {
  return (
    <Button 
      variant={variant} 
      size={size} 
      disabled={disabled}
      onClick={() => onClick()}> 
        {children}
    </Button>
  );
};

ButtonMockup.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonMockup.defaultProps = {
  children: 'Click Me !!',
  variant: "default",
  size: "default",
  disabled: false,
};
