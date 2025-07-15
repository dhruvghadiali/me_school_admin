import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getFacilityTypes } from "@MERedux/facility/facilityAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import FacilityScreenHeader from "@MEScreenComponents/facility/header";
import FacilityScreenAGGridTable from "@MEScreenComponents/facility/agGridTable";

const FacilityScreen = () => {
  const dispatch = useDispatch();
  //   const { feeLoader } = useSelector((state) => state.fee);

  useEffect(() => {
    dispatch(getFacilityTypes());
    // dispatch(getAcademicClasses());
  }, [dispatch]);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <FacilityScreenHeader />
          <FacilityScreenAGGridTable/>
          {/* {feeLoader ? <FeeScreenAGGridLoader /> : <FeeScreenAGGridTable />} */}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default FacilityScreen;
