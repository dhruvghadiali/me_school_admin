import _ from "lodash";
import moment from "moment";

import { ADMISSION_APPLICATION } from "@MEHelpers/enums";

/**
 * Returns the current academic session based on the current date
 * Academic session is determined by comparing current month with ACADEMIC_SESSION_START_MONTH
 * If current month is after session start month: returns current year and next year
 * Otherwise: returns previous year and current year
 * @param {}
 * @returns {string} - Academic session in format "YYYY-YYYY"
 * @example
 * currentAcademicSession() // returns "2025-2026" if current month > ACADEMIC_SESSION_START_MONTH
 * currentAcademicSession() // returns "2024-2025" if current month <= ACADEMIC_SESSION_START_MONTH
 */
const currentAcademicSession = (count) => {
  const isAfterStartMonth =
    moment().month() > ADMISSION_APPLICATION.ACADEMIC_SESSION_START_MONTH;

  const sessionStartYear = isAfterStartMonth
    ? moment().add(1, "year").year()
    : moment().year();
  const sessionEndYear = isAfterStartMonth
    ? moment().add(2, "year").year()
    : moment().add(1, "year").year();

  const currentSession = `${sessionStartYear}-${sessionEndYear}`;

  if (count === undefined || count === null) {
    return currentSession;
  }

  const total = Number(count);
  if (!Number.isFinite(total) || total <= 0) {
    return [];
  }

  return Array.from({ length: total }, (_, index) => {
    const startYear = sessionStartYear - index;
    const endYear = sessionEndYear - index;
    return `${startYear}-${endYear}`;
  });
};

const createStateOptions = (states) => {
  if (_.isArray(states) && _.size(states) > 0) {
    return _.map(states, (state) => ({
      label: _.startCase(state.name),
      value: state.id,
    }));
  }
};

const createDistrictOptions = (districts) => {
  if (_.isArray(districts) && _.size(districts) > 0) {
    return _.map(districts, (district) => ({
      label: _.startCase(district.name),
      value: district.id,
    }));
  }
};

const createCityOptions = (cities) => {
  if (_.isArray(cities) && _.size(cities) > 0) {
    return _.map(cities, (city) => ({
      label: _.startCase(city.name),
      value: city.id,
    }));
  }
};

const createAreaOptions = (areas) => {
  if (_.isArray(areas) && _.size(areas) > 0) {
    return _.map(areas, (area) => ({
      label: _.startCase(area.name),
      value: area.id,
    }));
  }
};

const createZipcodeOptions = (zipcodes) => {
  if (_.isArray(zipcodes) && _.size(zipcodes) > 0) {
    return _.map(zipcodes, (zipcode) => ({
      label: zipcode.zipcode,
      value: zipcode.id,
    }));
  }
};

const getStateIdByName = (states, name) => {
  const state = _.find(states, { name });
  return state ? state.id : null;
};

const getDistrictIdByName = (districts, name) => {
  const district = _.find(districts, { name });
  return district ? district.id : null;
};

const getCityIdByName = (cities, name) => {
  const city = _.find(cities, { name });
  return city ? city.id : null;
};

const getAreaIdByName = (areas, name) => {
  const area = _.find(areas, { name });
  return area ? area.id : null;
};

const getZipcodeIdByZipcode = (zipcodes, zipcode) => {
  const zip = _.find(zipcodes, { zipcode });
  return zip ? zip.id : null;
};

const getDistrictsByStateId = (states, stateId) => {
  const state = _.find(states, { id: stateId });
  return state ? state.districts : [];
};

const getCitiesByDistrictId = (districts, districtId) => {
  const district = _.find(districts, { id: districtId });
  return district ? district.cities : [];
};

const getAreasByCityId = (cities, cityId) => {
  const city = _.find(cities, { id: cityId });
  return city ? city.area_names : [];
};  

const getZipcodesByAreaId = (areas, areaId) => {
  const area = _.find(areas, { id: areaId });
  return area ? area.zipcodes : [];
};


export {
  getAreaIdByName,
  getCityIdByName,
  getStateIdByName,
  getAreasByCityId,
  createAreaOptions,
  createCityOptions,
  createStateOptions,
  getZipcodesByAreaId,
  getDistrictIdByName,
  createZipcodeOptions,
  getZipcodeIdByZipcode,
  getDistrictsByStateId,
  getCitiesByDistrictId,
  createDistrictOptions,
  currentAcademicSession,
};
