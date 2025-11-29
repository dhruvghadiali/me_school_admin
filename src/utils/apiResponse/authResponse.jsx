import _ from "lodash";

const setUserInformation = (user) => {
  return {
    id: user && user.id ? user.id : null,
    firstName: user && user.first_name ? user.first_name : "",
    lastName: user && user.last_name ? user.last_name : "",
    username: user && user.username ? user.username : "",
    email: user && user.email ? user.email : "",
    phoneNumber: user && user.phone_number ? user.phone_number : "",
    isActive:
      user && typeof user.is_active === "boolean" ? user.is_active : false,
    isAccountVerified:
      user && typeof user.is_account_verified === "boolean"
        ? user.is_account_verified
        : false,
    createdAt: user && user.created_at ? user.created_at : null,
    updatedAt: user && user.updated_at ? user.updated_at : null,
    school: user && user.school ? setSchoolInformation(user.school) : null,
    organization:
      user && user.organization
        ? setOrganizationInformation(user.organization)
        : null,
  };
};

const setOrganizationInformation = (organization) => {
  return {
    id: organization && organization.id ? organization.id : null,
    name: organization && organization.name ? organization.name : "",
    shortName:
      organization && organization.short_name ? organization.short_name : "",
    email: organization && organization.email ? organization.email : "",
    phoneNumber:
      organization && organization.phone_number
        ? organization.phone_number
        : "",
    governmentRegistrationNumber:
      organization && organization.government_registration_number
        ? organization.government_registration_number
        : "",
    address: organization && organization.address ? organization.address : "",
    state: organization && organization.state ? organization.state : "",
    district:
      organization && organization.district ? organization.district : "",
    city: organization && organization.city ? organization.city : "",
    areaName:
      organization && organization.area_name ? organization.area_name : "",
    zipcode: organization && organization.zipcode ? organization.zipcode : "",
    members:
      organization && Array.isArray(organization.members)
        ? setOrganizationMembersInformation(organization.members)
        : [],
  };
};

const setOrganizationMembersInformation = (members) => {
  return _.size(members) > 0
    ? members.map((member) => ({
        id: member.id ? member.id : null,
        firstName: member.first_name ? member.first_name : "",
        lastName: member.last_name ? member.last_name : "",
        email: member.email ? member.email : "",
        phoneNumber: member.phone_number ? member.phone_number : "",
        position: member.position ? member.position : "",
        aadhaarNumber: member.aadhaar_number ? member.aadhaar_number : "",
        address: member.address ? member.address : "",
        state: member.state ? member.state : "",
        district: member.district ? member.district : "",
        city: member.city ? member.city : "",
        areaName: member.area_name ? member.area_name : "",
        zipcode: member.zipcode ? member.zipcode : "",
      }))
    : [];
};

const setSchoolInformation = (school) => {
  return {
    id: school && school.id ? school.id : null,
    schoolAddressId:
      school && school.school_address_id ? school.school_address_id : null,
    affiliateNumber:
      school && school.affiliate_number ? school.affiliate_number : "",
    name: school && school.name ? school.name : "",
    shortName: school && school.short_name ? school.short_name : "",
    email: school && school.email ? school.email : "",
    phoneNumber: school && school.phone_number ? school.phone_number : "",
    schoolType: school && school.school_type ? school.school_type : "",
    educationBoards:
      school && Array.isArray(school.education_boards)
        ? setEducationBoardsInformation(school.education_boards)
        : [],
    address: school && school.address ? school.address : "",
    state: school && school.state ? school.state : "",
    district: school && school.district ? school.district : "",
    city: school && school.city ? school.city : "",
    areaName: school && school.area_name ? school.area_name : "",
    zipcode: school && school.zipcode ? school.zipcode : "",
  };
};

const setEducationBoardsInformation = (educationBoards) => {
  return _.size(educationBoards) > 0
    ? educationBoards.map((board) => ({
        id: board._id ? board._id : null,
        educationBoard: board.education_board ? board.education_board : "",
      }))
    : [];
};

export { setUserInformation };
