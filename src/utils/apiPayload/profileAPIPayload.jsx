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

const updateOrganizationMemberAPIPayload = (formPayload) => {
  return {
    id: _.get(formPayload, "id", null),
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

const deleteOrganizationMemberAPIPayload = (member) => {
  return {
    id: member.id,
  };
};

const transformHoursPayload = (hours) =>
  _.mapValues(hours, (day) => ({
    open_time: day.openTime,
    close_time: day.closeTime,
    closed: day.closed,
  }));

const updateSchoolAddressAPIPayload = (user, formPayload) => {
  const data = {
    address: formPayload.address,
    state: formPayload.state,
    district: formPayload.district,
    city: formPayload.city,
    area_name: formPayload.areaName,
    zipcode: formPayload.zipcode,
    school_hours: transformHoursPayload(formPayload.schoolHours),
    administrative_hours: transformHoursPayload(formPayload.administrativeHours),
  };

  if (formPayload.latitude) data.latitude = formPayload.latitude;
  if (formPayload.longitude) data.longitude = formPayload.longitude;
  if (formPayload.campusArea) data.campus_area = formPayload.campusArea;
  if (formPayload.buildingArea) data.building_area = formPayload.buildingArea;
  if (formPayload.outdoorArea) data.outdoor_area = formPayload.outdoorArea;

  return {
    id: _.get(user, "school.schoolAddressId", null),
    data,
  };
};

export {
  schoolAboutAPIPayload,
  updateSchoolAddressAPIPayload,
  addOrganizationMemberAPIPayload,
  updateOrganizationMemberAPIPayload,
  deleteOrganizationMemberAPIPayload,
};
