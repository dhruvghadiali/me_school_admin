const educationBoardsInfo = (data) => {
  return {
    id: data && data.id ? data.id : "",
    educationBoard: data && data.education_board ? data.education_board : "",
  };
};

const schoolInfo = (data) => {
  return {
    id: data && data.id ? data.id : "",
    schoolAddressId:
      data && data.school_address_id ? data.school_address_id : "",
    affiliateNumber: data && data.affiliate_number ? data.affiliate_number : "",
    name: data && data.name ? data.name : "",
    shortName: data && data.short_name ? data.short_name : "",
    email: data && data.email ? data.email : "",
    phoneNumber: data && data.phone_number ? data.phone_number : "",
    address: data && data.address ? data.address : "",
    state: data && data.state ? data.state : "",
    district: data && data.district ? data.district : "",
    city: data && data.city ? data.city : "",
    areaName: data && data.area_name ? data.area_name : "",
    zipCode: data && data.zipcode ? data.zipcode : "",
    schoolType: data && data.school_type ? data.school_type : "",
    educationBoards:
      data && data.education_boards && data.education_boards.length > 0
        ? data.education_boards.map((educationBoard) =>
            educationBoardsInfo(educationBoard)
          )
        : [],
  };
};

const signInAPIResponse = (data) => {
  return {
    id: data && data.id ? data.id : "",
    firstName: data && data.first_name ? data.first_name : "",
    lastName: data && data.last_name ? data.last_name : "",
    email: data && data.email ? data.email : "",
    phoneNumber: data && data.phone_number ? data.phone_number : "",
    username: data && data.username ? data.username : "",
    isActive: data && data.is_active ? data.is_active : "",
    isAccountVerified:
      data && data.is_account_verified ? data.is_account_verified : "",
    createdAt: data && data.created_at ? data.created_at : "",
    updatedAt: data && data.updated_at ? data.updated_at : "",
    token: data && data.token ? data.token : "",
    school: data && data.school ? schoolInfo(data.school) : {},
  };
};

export { signInAPIResponse };
