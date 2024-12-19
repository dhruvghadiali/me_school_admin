import {variantColor} from '../../utils/enums';

export const defaultSummaryData = {
  summary: {
    admissionForm: 0,
    approvedForm: 0,
    rejectedForm: 0,
    canceledForm: 0,
  },
  applicationFormSummary: [],
  classLevelSummary: [],
};

export const defaultApplicationFormSummaryChartConfig = {}; 

export const defaultApplicationFormSummaryBarChartColor = variantColor.PRIMARY

export const defaultClassLevelSummaryChartConfig = {}; 

export const defaultClassLevelSummaryLineChartConfig = [
  {
    dataKey: "admissionForm",
    fill: "#3b98ba",
    stroke: "#3b98ba",
    name: "Total Form",
  },
  {
    dataKey: "approvedForm",
    fill: "#60b159",
    stroke: "#60b159",
    name: "Approved Form",
  },
  {
    dataKey: "rejectedForm",
    fill: "#ab4459",
    stroke: "#ab4459",
    name: "Rejected Form",
  },
  {
    dataKey: "canceledForm",
    fill: "#d17615",
    stroke: "#d17615",
    name: "Canceled Form",
  },
];
