import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockSummaryData } from "@MERedux/dashboard/mockResponse";

import _ from "lodash";

export const summary = createAsyncThunk(
  "dashboard/summary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve, reject) => {
        /** API Call: Validating user is valid or not. */

        setTimeout(async () => {
          try {
            const res = await fetch(
              "https://jsonplaceholder.typicode.com/users"
            );
            if (!res.ok) {
              throw new Error("Failed to fetch users");
            }
            resolve(mockSummaryData);
          } catch (error) {
            reject(error);
          }
        }, 5000); // 2 seconds delay
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const prepareApplicationFormSummary = (summaryData, activeMenu) => {
  const applicationFormSummary =
    summaryData &&
    summaryData.applicationFormSummary &&
    summaryData.applicationFormSummary.length > 0
      ? summaryData.applicationFormSummary
      : [];

  const applicationFormSummaryDropdownList = _.map(
    applicationFormSummary,
    "label"
  );

  const applicationFormSummaryActiveMenu = activeMenu
    ? activeMenu
    : applicationFormSummaryDropdownList.length > 0
    ? applicationFormSummaryDropdownList[0]
    : "";

  const applicationFormSummarySelectionData = _.find(
    applicationFormSummary,
    (summary) => summary.label === applicationFormSummaryActiveMenu
  );

  const applicationFormSummaryChartData =
    applicationFormSummarySelectionData &&
    applicationFormSummarySelectionData.data
      ? applicationFormSummarySelectionData.data
      : [];

  return {
    applicationFormSummaryDropdownList,
    applicationFormSummaryActiveMenu,
    applicationFormSummaryChartData,
  };
};

export const prepareClassLevelSummary = (summaryData, activeMenu) => {
  const classLevelSummary =
    summaryData &&
    summaryData.classLevelSummary &&
    summaryData.classLevelSummary.length > 0
      ? summaryData.classLevelSummary
      : [];

  const classLevelSummaryDropdownList = _.map(classLevelSummary, "label");

  const classLevelSummaryActiveMenu = activeMenu
    ? activeMenu
    : classLevelSummaryDropdownList.length > 0
    ? classLevelSummaryDropdownList[0]
    : "";

  const classLevelSummarySelectionData = _.find(
    classLevelSummary,
    (summary) => summary.label === classLevelSummaryActiveMenu
  );

  const classLevelSummaryChartData =
    classLevelSummarySelectionData && classLevelSummarySelectionData.data
      ? classLevelSummarySelectionData.data
      : [];

  return {
    classLevelSummaryDropdownList,
    classLevelSummaryActiveMenu,
    classLevelSummaryChartData,
  };
};
