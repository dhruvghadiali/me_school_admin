import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";

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
