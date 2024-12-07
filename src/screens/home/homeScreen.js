import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";

const HomeScreen = () => {
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <h1> Home Screen</h1>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default HomeScreen;
