import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { setSidebarMenuNameBasedURL } from "@MEUtils/utilityFunctions";
import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";

import _ from "lodash";
import PropTypes from "prop-types";

const AuthHoc = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeMenu } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const pathName = location && location.pathname;
    if (activeMenu !== pathName) {
      dispatch(changeActiveMenu(setSidebarMenuNameBasedURL(pathName)));
    }
  });

  return <div className="bg-background h-screen w-screen">{children}</div>;
};

AuthHoc.propTypes = {
  children: PropTypes.any,
};

export default AuthHoc;
