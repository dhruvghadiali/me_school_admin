import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { admissionScreenContainerType } from "@MEUtils/enums";
import { resetState } from "@MERedux/admission/admissionSlice";
import { admissionForm } from "@MERedux/admission/admissionAction";

import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
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

  console.log(
    "containerType == admissionScreenContainerType.AGGRIDTABLE",
    containerType
  );
  return (
    <>
      <AuthHoc>
        <MESidebar>
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
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default AdmissionScreen;
