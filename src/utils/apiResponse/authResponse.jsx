import _ from "lodash";

const setUserInformation = (user) => {
  return {
    id: _.get(user, "id", null),
    firstName: _.get(user, "first_name", ""),
    lastName: _.get(user, "last_name", ""),
    username: _.get(user, "username", ""),
    email: _.get(user, "email", ""),
    phoneNumber: _.get(user, "phone_number", ""),
    isActive: _.isBoolean(_.get(user, "is_active"))
      ? user.is_active
      : false,
    isAccountVerified: _.isBoolean(_.get(user, "is_account_verified"))
      ? user.is_account_verified
      : false,
    createdAt: _.get(user, "created_at", null),
    updatedAt: _.get(user, "updated_at", null),
    school: _.has(user, "school")
      ? setSchoolInformation(user.school)
      : null,
    organization: _.has(user, "organization")
      ? setOrganizationInformation(user.organization)
      : null,
  };
};

const setOrganizationInformation = (organization) => {
  return {
    id: _.get(organization, "id", null),
    name: _.get(organization, "name", ""),
    shortName: _.get(organization, "short_name", ""),
    email: _.get(organization, "email", ""),
    phoneNumber: _.get(organization, "phone_number", ""),
    governmentRegistrationNumber: _.get(organization, "government_registration_number", ""),
    address: _.get(organization, "address", ""),
    state: _.get(organization, "state", ""),
    district: _.get(organization, "district", ""),
    city: _.get(organization, "city", ""),
    areaName: _.get(organization, "area_name", ""),
    zipcode: _.get(organization, "zipcode", ""),
    members: _.isArray(_.get(organization, "members"))
      ? setOrganizationMembersInformation(organization.members)
      : [],
  };
};

const setOrganizationMembersInformation = (members) => {
  return _.map(members, (member) => ({
    id: _.get(member, "id", null),
    firstName: _.get(member, "first_name", ""),
    lastName: _.get(member, "last_name", ""),
    email: _.get(member, "email", ""),
    phoneNumber: _.get(member, "phone_number", ""),
    position: _.get(member, "position", ""),
    aadhaarNumber: _.get(member, "aadhaar_number", ""),
    address: _.get(member, "address", ""),
    state: _.get(member, "state", ""),
    district: _.get(member, "district", ""),
    city: _.get(member, "city", ""),
    areaName: _.get(member, "area_name", ""),
    zipcode: _.get(member, "zipcode", ""),
  }));
};

const setSchoolInformation = (school) => {
  return {
    id: _.get(school, "id", null),
    schoolAddressId: _.get(school, "school_address_id", null),
    affiliateNumber: _.get(school, "affiliate_number", ""),
    name: _.get(school, "name", ""),
    shortName: _.get(school, "short_name", ""),
    email: _.get(school, "email", ""),
    phoneNumber: _.get(school, "phone_number", ""),
    schoolType: _.get(school, "school_type", ""),
    educationBoards: _.isArray(_.get(school, "education_boards"))
      ? setEducationBoardsInformation(school.education_boards)
      : [],
    establishedYear: _.get(school, "established_year", ""),
    about: _.get(school, "about", ""),
    address: _.get(school, "address", ""),
    state: _.get(school, "state", ""),
    district: _.get(school, "district", ""),
    city: _.get(school, "city", ""),
    areaName: _.get(school, "area_name", ""),
    zipcode: _.get(school, "zipcode", ""),
  };
};

const setEducationBoardsInformation = (educationBoards) => {
  return _.map(educationBoards, (board) => ({
    id: _.get(board, "_id", null),
    educationBoard: _.get(board, "education_board", ""),
  }));
};

export { setUserInformation, setOrganizationMembersInformation };
