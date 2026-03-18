import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { PROFILE_TABS_ID } from "@MEHelpers/enums";
import {
  getStates,
} from "@MERedux/profile/profileAction";
import {
  setActiveTab,
  resetProfileFormSheetStatus,
} from "@MERedux/profile/profileSlice";

import ProfileScreenComponent from "@MEScreenComponents/profile";
import ProfileScreenHeader from "@MEScreenComponents/profile/header";

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStates());
    dispatch(resetProfileFormSheetStatus());
    dispatch(setActiveTab(PROFILE_TABS_ID.SCHOOL));
  }, [dispatch]);

  return (
    <>
      <ProfileScreenHeader />
      <ProfileScreenComponent />
    </>
  );
};

export default ProfilePage;
