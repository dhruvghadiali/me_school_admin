import { createSlice } from "@reduxjs/toolkit";
import {
  summary,
  prepareClassLevelSummary,
  prepareApplicationFormSummary,
} from "./dashboardAction";
import {
  defaultSummaryData,
  defaultApplicationFormSummaryChartConfig,
  defaultClassLevelSummaryLineChartConfig,
  defaultClassLevelSummaryChartConfig,
  defaultApplicationFormSummaryBarChartColor,
} from "./dashboardDefaultStateValues";
import { responseMessage } from "../../utils/responseMessage";
import {variantColor} from '../../utils/enums';

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summaryData: defaultSummaryData,
    loader: false,
    error: "",

    applicationFormSummaryActiveMenu: "",
    applicationFormSummaryBarChartColor: defaultApplicationFormSummaryBarChartColor,
    applicationFormSummaryDropdownList: [],
    applicationFormSummaryChartData: [],
    applicationFormSummaryChartConfig: defaultApplicationFormSummaryChartConfig,

    classLevelSummaryActiveMenu: "",
    classLevelSummaryDropdownList: [],
    classLevelSummaryChartData: [],
    classLevelSummaryChartConfig: defaultClassLevelSummaryChartConfig,
    classLevelSummaryLineChartConfig: defaultClassLevelSummaryLineChartConfig,
  },
  reducers: {
    resetState: (state, _) => {
      state.summaryData = defaultSummaryData;
      state.loader = false;
      state.error = "";

      state.applicationFormSummaryActiveMenu = "";
      state.applicationFormSummaryBarChartColor = defaultApplicationFormSummaryBarChartColor;
      state.applicationFormSummaryDropdownList = [];
      state.applicationFormSummaryChartData = [];
      state.applicationFormSummaryChartConfig =
        defaultApplicationFormSummaryChartConfig;

      state.classLevelSummaryActiveMenu = "";
      state.classLevelSummaryDropdownList = [];
      state.classLevelSummaryChartData = [];
      state.classLevelSummaryLineChartConfig =
        defaultClassLevelSummaryLineChartConfig;
      state.classLevelSummaryChartConfig = defaultClassLevelSummaryChartConfig;
    },
    setApplicationFormSummaryActiveMenu: (state, action) => {
      state.applicationFormSummaryActiveMenu = action.payload;
      const { applicationFormSummaryChartData } = prepareApplicationFormSummary(
        state.summaryData,
        state.applicationFormSummaryActiveMenu
      );
      state.applicationFormSummaryChartData = applicationFormSummaryChartData;
    },
    setApplicationFormSummaryBarChartColor: (state, action) => {
      let color = "";
      switch (action.payload) {
        case 0:
          color = variantColor.PRIMARY;
          break;
        case 1:
          color = variantColor.SUCCESS;
          break;
        case 2:
          color = variantColor.DANGER;
          break;
        case 3:
          color = variantColor.WARNING;
          break;
        default:
          color = variantColor.DARK;
          break;
      }

      state.applicationFormSummaryBarChartColor = color;
    },
    setClassLevelSummaryActiveMenu: (state, action) => {
      state.classLevelSummaryActiveMenu = action.payload;
      const { classLevelSummaryChartData } = prepareClassLevelSummary(
        state.summaryData,
        state.classLevelSummaryActiveMenu
      );
      state.classLevelSummaryChartData = classLevelSummaryChartData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(summary.pending, (state, _) => {
        state.loader = true;
        state.error = "";

        /** */
        state.summaryData = defaultSummaryData;

        /** */
        state.applicationFormSummaryActiveMenu = "";
        state.applicationFormSummaryBarChartColor = defaultApplicationFormSummaryBarChartColor;
        state.applicationFormSummaryDropdownList = [];
        state.applicationFormSummaryChartData = [];
        state.applicationFormSummaryChartConfig =
          defaultApplicationFormSummaryChartConfig;

        /** */
        state.classLevelSummaryActiveMenu = "";
        state.classLevelSummaryDropdownList = [];
        state.classLevelSummaryChartData = [];
        state.classLevelSummaryLineChartConfig =
          defaultClassLevelSummaryLineChartConfig;
        state.classLevelSummaryChartConfig =
          defaultClassLevelSummaryChartConfig;
      })
      .addCase(summary.fulfilled, (state, action) => {
        state.loader = false;
        state.error = "";
        state.summaryData = action.payload;

        /** */
        const {
          applicationFormSummaryDropdownList,
          applicationFormSummaryActiveMenu,
          applicationFormSummaryChartData,
        } = prepareApplicationFormSummary(state.summaryData);

        const {
          classLevelSummaryDropdownList,
          classLevelSummaryChartData,
          classLevelSummaryActiveMenu,
        } = prepareClassLevelSummary(state.summaryData);

        state.classLevelSummaryActiveMenu = classLevelSummaryActiveMenu;
        state.classLevelSummaryDropdownList = classLevelSummaryDropdownList;
        state.classLevelSummaryChartData = classLevelSummaryChartData;
        state.applicationFormSummaryBarChartColor = defaultApplicationFormSummaryBarChartColor;

        state.applicationFormSummaryDropdownList =
          applicationFormSummaryDropdownList;
        state.applicationFormSummaryActiveMenu =
          applicationFormSummaryActiveMenu;
        state.applicationFormSummaryChartData = applicationFormSummaryChartData;
      })
      .addCase(summary.rejected, (state, action) => {
        state.loader = false;

        /** */
        state.summaryData = defaultSummaryData;

        /** */
        state.applicationFormSummaryActiveMenu = "";
        state.applicationFormSummaryBarChartColor = defaultApplicationFormSummaryBarChartColor;
        state.applicationFormSummaryDropdownList = [];
        state.applicationFormSummaryChartData = [];
        state.applicationFormSummaryChartConfig =
          defaultApplicationFormSummaryChartConfig;

        /** */
        state.classLevelSummaryActiveMenu = "";
        state.classLevelSummaryDropdownList = [];
        state.classLevelSummaryChartData = [];
        state.classLevelSummaryLineChartConfig =
          defaultClassLevelSummaryLineChartConfig;
        state.classLevelSummaryChartConfig =
          defaultClassLevelSummaryChartConfig;

        state.error = action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const {
  resetState,
  setApplicationFormSummaryActiveMenu,
  setApplicationFormSummaryBarChartColor,
  setClassLevelSummaryActiveMenu,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
