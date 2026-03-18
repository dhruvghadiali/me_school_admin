import _ from "lodash";

const schoolAboutAPIPayload = (user, formPayload) => {
  return {
    id: _.get(user, "school.id", null),
    data: {
      about: _.chain(formPayload.about).split("\n").join(" ").trim().value(),
    },
  };
};

const addOrganizationMemberAPIPayload = (user, formPayload) => {
  return {
    id: _.get(user, "organization.id", null),
    data: {
      first_name: formPayload.firstName,
      last_name: formPayload.lastName,
      email: formPayload.email,
      phone_number: formPayload.phoneNumber,
      position: formPayload.position,
      aadhaar_number: formPayload.aadhaarNumber,
      address: formPayload.address,
      state: formPayload.state,
      district: formPayload.district,
      city: formPayload.city,
      area_name: formPayload.areaName,
      zipcode: formPayload.zipcode,
    },
  };
};

export { schoolAboutAPIPayload, addOrganizationMemberAPIPayload };
