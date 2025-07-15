import _ from "lodash";

const setFacilities = (facilities) => {
  return _.map(facilities, (facility) => {
    return {
      id: facility && facility.id ? facility.id : "",
      facilityName:
        facility && facility.facility_name ? facility.facility_name : "",
    };
  });
};

const facilityTypesAPIResponse = (facilityTypes) => {
  return _.map(facilityTypes, (facilityType) => {
    return {
      value: facilityType && facilityType.id ? facilityType.id : "",
      label:
        facilityType && facilityType.facility_type
          ? facilityType.facility_type
          : "",
      facilities:
        facilityType &&
        facilityType.facilities &&
        facilityType.facilities.length > 0
          ? setFacilities(facilityType.facilities)
          : [],
    };
  });
};

export { facilityTypesAPIResponse };
