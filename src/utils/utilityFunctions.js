import { sidebarMenuName } from "@MEUtils/enums";
import { routeName } from "@MEUtils/routeName";
import _ from "lodash";

export const indianNumberFormate = (value) => {
  const val = Math.abs(value);
  if (val >= 10000000) return `${(value / 10000000).toFixed(2)} C`;
  if (val >= 100000) return `${(value / 100000).toFixed(2)} L`;
  if (val >= 1000) return `${(value / 1000).toFixed(2)} T`;
  return value;
};

export const isUndefinedOrNull = (value) => {
  return value === undefined || value === null;
};

export const formateStringWithLodash = (string, lodashFunction) => {
  return string ? string.replace(/\w+/g, lodashFunction ? lodashFunction : _.toLower) : "";
};

export const setSidebarMenuNameBasedURL = (pathName) => {
  switch (pathName) {
    case routeName.dashboard:
      return sidebarMenuName.DASHBOARD;
    case routeName.admission:
      return sidebarMenuName.ADMISSION;
    case routeName.schoolProfile:
      return sidebarMenuName.PROFILE;
    case routeName.settings:
      return sidebarMenuName.SETTINGS;
    default:
      return sidebarMenuName.DASHBOARD;
  }
};
