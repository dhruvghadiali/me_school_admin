import moment from "moment";
import _ from "lodash";

const setFacilities = (facilities) => {
  return _.map(facilities, (facility) => {
    return {
      value: facility && facility.id ? facility.id : "",
      label: facility && facility.facility_name ? facility.facility_name : "",
    };
  });
};

const setSchoolFacilities = (facilities, schoolFacilities) => {
  return _.orderBy(_.map(facilities, (facility) => {
    const schoolFacility = _.find(schoolFacilities, (schoolFacility) => {
      return (
        schoolFacilities &&
        schoolFacility.facility &&
        schoolFacility.facility.id === facility.id
      );
    });

    return {
      facilityId: facility && facility.id ? facility.id : "",
      facilityName:
        facility && facility.facility_name
          ? _.toUpper(facility.facility_name)
          : "",
      id: schoolFacility && schoolFacility.id ? schoolFacility.id : "",
      isAvailable: schoolFacility && schoolFacility.is_active ? "Yes" : "No",
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
  }),['isAvailable', 'facilityName'], ['desc', 'asc']);
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
