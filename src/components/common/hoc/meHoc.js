import { useEffect } from "react";
import { useNavigate } from "react-router";

import { appEnv } from "@MEUtils/enums";
import { routeName } from "@MEUtils/routeName";

// import MEEnvHoc from "@MECommonComponents/hoc/meEnvHoc";
import PropTypes from "prop-types";

const MEHoc = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("MEHoc User:", user);

    if(user){
       navigate(routeName.dashboard, { replace: true });
    }
  }, [navigate]);

  return <div className="pl-5 pr-5">{children}</div>
  // return process.env.REACT_APP_ENV === appEnv.MOCK ? (
  //   <MEEnvHoc>
  //     <div className="pl-5 pr-5">{children}</div>
  //   </MEEnvHoc>
  // ) : (
  //   <div className="pl-5 pr-5">{children}</div>
  // );
};

MEHoc.propTypes = {
  children: PropTypes.any,
};

export default MEHoc;
