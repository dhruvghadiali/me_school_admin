import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";

const AdmissionScreen = () => {
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <h1> Admission Screen </h1>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default AdmissionScreen;
