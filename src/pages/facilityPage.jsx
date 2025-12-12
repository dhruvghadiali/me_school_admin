import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFacilityTypes } from "@MERedux/facility/facilityAction";

import MESidebar from "@MECommonComponents/sidebar/meSidebar";

const FacilityPage = () => {
  const dispatch = useDispatch();
  const { facilityLoader } = useSelector((state) => state.facility);

  useEffect(() => {
    dispatch(getFacilityTypes());
  }, [dispatch]);

  return (
    <MESidebar>
      <h1>Facility</h1>
    </MESidebar>
  );
};

export default FacilityPage;
