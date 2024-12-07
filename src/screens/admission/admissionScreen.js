import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";

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
