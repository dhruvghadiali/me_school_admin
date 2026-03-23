import _ from "lodash";

const transformHoursPayload = (hours) =>
  _.mapValues(hours, (day) => ({
    openTime: _.get(day, "open_time", ""),
    closeTime: _.get(day, "close_time", ""),
    closed: _.get(day, "closed", false),
  }));

const setAddressInformation = (schoolAddress) => {
  return {
    id: _.get(schoolAddress, "id", null),
    address: _.get(schoolAddress, "address", ""),
    state: _.get(schoolAddress, "state", ""),
    district: _.get(schoolAddress, "district", ""),
    city: _.get(schoolAddress, "city", ""),
    areaName: _.get(schoolAddress, "area_name", ""),
    zipcode: _.get(schoolAddress, "zipcode", ""),
    latitude: _.get(schoolAddress, "latitude", null),
    longitude: _.get(schoolAddress, "longitude", null),
    buildingArea: _.get(schoolAddress, "building_area", null),
    outdoorArea: _.get(schoolAddress, "outdoor_area", null),
    schoolHours: transformHoursPayload(_.get(schoolAddress, "school_hours", {})),
    administrativeHours: transformHoursPayload(_.get(schoolAddress, "administrative_hours", {})),
  };
};

export { setAddressInformation };