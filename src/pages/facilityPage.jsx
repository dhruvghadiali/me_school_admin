import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFacilityTypes } from "@MERedux/facility/facilityAction";

import FacilityScreenHeader from "@MEScreenComponents/facility/header";
import FacilityScreenTableData from "@MEScreenComponents/facility/tableData";
import FacilityScreenTableDataLoader from "@MEScreenComponents/facility/tableData/tableDataLoader";

const FacilityPage = () => {
  const dispatch = useDispatch();
  const { facilityLoader } = useSelector((state) => state.facility);

  useEffect(() => {
    dispatch(getFacilityTypes());
  }, [dispatch]);

  return (
    <>
      <FacilityScreenHeader />
      {facilityLoader ? (
        <FacilityScreenTableDataLoader />
      ) : (
        <FacilityScreenTableData />
      )}
    </>
  );
};

export default FacilityPage;
