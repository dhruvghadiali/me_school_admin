import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";

const ProfileScreen = () => {
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <h1> Profile Screen </h1>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default ProfileScreen;
