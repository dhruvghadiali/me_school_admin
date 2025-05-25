import AuthHoc from "@MECommonComponents/authHoc/authHoc";
import MESidebar from "@MECommonComponents/sidebar/meSidebar";
import ProfileScreenHeader from "@MEScreenComponents/profile/header/header";
import ProfileScreenSchoolDetail from "@MEScreenComponents/profile/profileDetail/schoolDetail";

/**
 * This screen will displayed basic school information and facilities provided by school
 * Basic Info:
 * Name, address, city, state, pincode, ownership, year of establishment, campus size, affiliation code, school registration number, eduction boards
 */
const ProfileScreen = () => {
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <ProfileScreenHeader />
          <ProfileScreenSchoolDetail/>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default ProfileScreen;
