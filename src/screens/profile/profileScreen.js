import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import ProfileScreenHeader from "@MEScreenComponents/profile/header/header";
import ProfileScreenSchoolDetail from "@MEScreenComponents/profile/profileDetail/schoolDetail";

/**
 * This screen will displayed basic school information and facilities provided by school
 * Basic Info:
 * Name, address, city, state, pincode, ownership, year of establishment, campus size, affiliation code, school registration number, education boards
 */
const ProfileScreen = () => {
  return (
    <>
      <MEAuthHoc>
        <ProfileScreenHeader />
        <ProfileScreenSchoolDetail />
      </MEAuthHoc>
    </>
  );
};

export default ProfileScreen;
