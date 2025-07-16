import moment from "moment";
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

const setSchoolFacilities = (facilities, schoolFacilities) => {
  return _.map(facilities, (facility) => {
    const schoolFacility = _.find(schoolFacilities, {
      facility: facility && facility.id ? facility.id : "",
    });

    return {
      id: facility && facility.id ? facility.id : "",
      facilityName:
        facility && facility.facility_name ? _.toUpper(facility.facility_name) : "",
      isAvailable: schoolFacility ? "Yes" : "No",
      createdAt:
        schoolFacility && schoolFacility.created_at
          ? moment(schoolFacility.created_at).format("DD MMM YYYY hh:mm A")
          : "",
      updatedAt:
        schoolFacility && schoolFacility.updated_at
          ? moment(schoolFacility.updated_at).format("DD MMM YYYY hh:mm A")
          : "",
      createdBy:
        schoolFacility && schoolFacility.created_by
          ? _.upperFirst(schoolFacility.created_by)
          : "",
      updatedBy:
        schoolFacility && schoolFacility.updated_by
          ? _.upperFirst(schoolFacility.updated_by)
          : "",
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

const facilitiesAPIResponse = (facilityTypes, schoolFacilities) => {
  return _.map(facilityTypes, (facilityType) => {
    return {
      id: facilityType && facilityType.id ? facilityType.id : "",
      facilityType:
        facilityType && facilityType.facility_type
          ? facilityType.facility_type
          : "",
      facilities:
        facilityType &&
        facilityType.facilities &&
        facilityType.facilities.length > 0
          ? setSchoolFacilities(facilityType.facilities, schoolFacilities)
          : [],
    };
  });
};

export { facilityTypesAPIResponse, facilitiesAPIResponse };
