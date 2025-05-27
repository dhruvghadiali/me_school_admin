import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admissionScreenContainerType } from "@MEUtils/enums";
import { resetState } from "@MERedux/admission/admissionSlice";
import { admissionForm } from "@MERedux/admission/admissionAction";

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import AdmissionScreenHeader from "@MEScreenComponents/admission/header/header";
import AdmissionScreenFormDetail from "@MEScreenComponents/admission/formDetail/formDetail";
import AdmissionScreenAGGridTable from "@MEScreenComponents/admission/agGridTable/agGridTable";
import AdmissionScreenAGGridLoader from "@MEScreenComponents/admission/agGridTable/agGridLoader";

const AdmissionScreen = () => {
  const dispatch = useDispatch();
  const { tableDataLoader, containerType } = useSelector(
    (state) => state.admission
  );

  useEffect(() => {
    dispatch(resetState());
    dispatch(admissionForm());
  }, []);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <AdmissionScreenHeader />
          {containerType === admissionScreenContainerType.AGGRIDTABLE &&
            (tableDataLoader ? (
              <AdmissionScreenAGGridLoader />
            ) : (
              <AdmissionScreenAGGridTable />
            ))}
          {containerType === admissionScreenContainerType.FORMDETAILCARD && (
            <AdmissionScreenFormDetail />
          )}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default AdmissionScreen;
