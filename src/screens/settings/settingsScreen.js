import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";

const SettingsScreen = () => {
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <h1> Settings Screen </h1>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default SettingsScreen;
