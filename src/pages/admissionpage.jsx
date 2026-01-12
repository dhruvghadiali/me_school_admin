import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import AdmissionScreenHeader from "@MEScreenComponents/admission/header";
import AdmissionScreenTableData from "@MEScreenComponents/admission/tableData";
import AdmissionScreenTableDataLoader from "@MEScreenComponents/admission/tableData/tableDataLoader";

const AdmissionPage = () => {
  // You can use Redux state here when API is ready
  // const dispatch = useDispatch();
  // const { admissionLoader } = useSelector((state) => state.admission);

  // For now, we'll show the table directly
  const showLoader = false;

  return (
    <>
      <AdmissionScreenHeader />
      {showLoader ? (
        <AdmissionScreenTableDataLoader />
      ) : (
        <AdmissionScreenTableData />
      )}
    </>
  );
};

export default AdmissionPage;
