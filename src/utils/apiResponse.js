import _ from "lodash";

const signInAPIResponse = (data) => {
  return {
    id: data && data.id ? data.id : "",
    firstName: data && data.first_name ? data.first_name : "",
    lastName: data && data.last_name ? data.last_name : "",
    email: data && data.email ? data.email : "",
    phoneNumber: data && data.phone_number ? data.phone_number : "",
    username: data && data.username ? data.username : "",
    isActive:
      data && data.is_active ? data.is_active : "",
    isAccountVerified:
      data && data.is_account_verified ? data.is_account_verified : "",
    createdAt: data && data.created_at ? data.created_at : "",
    updatedAt: data && data.updated_at ? data.updated_at : "",
    token: data && data.token ? data.token : "",
  };
};

export { signInAPIResponse};
