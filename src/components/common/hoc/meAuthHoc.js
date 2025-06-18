import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";

import { routeName } from "@MEUtils/routeName";
import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";
import { setSidebarMenuNameBasedURL } from "@MEUtils/utilityFunctions";
import { signOutUser, setUserDetails } from "@/slice/authentication/authenticationSlice";

import PropTypes from "prop-types";

import MESidebar from "@MECommonComponents/sidebar/meSidebar";

const MEAuthHoc = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeMenu } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      dispatch(signOutUser({}));
      navigate(routeName.signIn, { replace: true });
    } else {
      const pathName = location && location.pathname;

      dispatch(setUserDetails(user));
      if (activeMenu !== pathName) {
        dispatch(changeActiveMenu(setSidebarMenuNameBasedURL(pathName)));
      }
    }
  }, [navigate, dispatch]);

  return <div className="bg-background h-screen w-full">
    <MESidebar>{children}</MESidebar>
  </div>;
  // return process.env.REACT_APP_ENV === appEnv.MOCK ? (
  //   <MEEnvHoc>
  //     <div className="pl-5 pr-5">{children}</div>
  //   </MEEnvHoc>
  // ) : (
  //   <MESidebar>{children}</MESidebar>
  // );
};

MEAuthHoc.propTypes = {
  children: PropTypes.any,
};

export default MEAuthHoc;
