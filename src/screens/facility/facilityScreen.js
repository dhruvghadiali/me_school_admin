import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFacilityTypes } from "@MERedux/facility/facilityAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import FacilityScreenHeader from "@MEScreenComponents/facility/header";
import FacilityScreenAGGridTable from "@MEScreenComponents/facility/agGridTable";
import FacilityScreenAGGridLoader from "@MEScreenComponents/facility/agGridTable/agGridLoader";

const FacilityScreen = () => {
  const dispatch = useDispatch();
  const { facilityLoader } = useSelector((state) => state.facility);

  useEffect(() => {
    dispatch(getFacilityTypes());
  }, [dispatch]);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <FacilityScreenHeader />
          {facilityLoader ? (
            <FacilityScreenAGGridLoader />
          ) : (
            <FacilityScreenAGGridTable />
          )}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default FacilityScreen;
