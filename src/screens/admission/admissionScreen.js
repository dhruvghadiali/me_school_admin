import { useEffect } from "react";
import { CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@MEShadcnComponents/button";
import { admissionScreenContainerType } from "@MEUtils/enums";
import { resetState } from "@MERedux/admission/admissionSlice";
import { admissionForm } from "@MERedux/admission/admissionAction";
import { setAdmissionScreenContainerType } from "@MERedux/admission/admissionSlice";

import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import AdmissionScreenHeader from "@MEScreenComponents/admission/header/header";
import AdmissionScreenAGGridTable from "@MEScreenComponents/admission/agGridTable/agGridTable";
import AdmissionScreenAGGridLoader from "@MEScreenComponents/admission/agGridTable/agGridLoader";

const AdmissionScreen = () => {
  const dispatch = useDispatch();
  const { tableDataloader, containerType } = useSelector(
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
          <AdmissionScreenHeader />
          {containerType === admissionScreenContainerType.AGGRIDTABLE &&
            (tableDataloader ? (
              <AdmissionScreenAGGridLoader />
            ) : (
              <AdmissionScreenAGGridTable />
            ))}
          {containerType === admissionScreenContainerType.FORMDETAILCARD && (
            <div className="justify-self-end">
              <Button
                variant="icon"
                onClick={() =>
                  dispatch(
                    setAdmissionScreenContainerType(
                      admissionScreenContainerType.AGGRIDTABLE
                    )
                  )
                }
              >
                <CircleX />
              </Button>
            </div>
          )}
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default AdmissionScreen;
