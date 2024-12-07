import PropTypes from "prop-types";

const AuthHoc = ({ children }) => {
  return <div className="bg-background h-screen w-screen">{children}</div>;
};

AuthHoc.propTypes = {
  children: PropTypes.any,
};

export default AuthHoc;
