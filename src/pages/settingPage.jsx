import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { resetSettingState } from "@MERedux/setting/settingSlice";

import SettingScreenHeaderComponent from "@MEScreenComponents/setting/header";
import SettingScreenComponent from "@MEScreenComponents/setting";

const SettingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSettingState());
  }, [dispatch]);

  return (
    <>
      <SettingScreenHeaderComponent />
      <SettingScreenComponent />
    </>
  );
};

export default SettingPage;
