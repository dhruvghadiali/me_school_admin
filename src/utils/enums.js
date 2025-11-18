import moment from "moment";

const variants = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DANGER: "danger",
    WARNING: "warning",
    SUCCESS: "success",
    DARK: "dark",
};

const variantColor = {
    PRIMARY: "#3b98ba",
    DANGER: "#ab4459",
    WARNING: "#d17615",
    SUCCESS: "#60b159",
    DARK: "#1b1b1d",
};

const sidebarMenuName = {
    DASHBOARD: "dashboard",
    ADMISSION: "admission",
    ACADEMIC_CLASS: "academicClass",
    FEES: "fees",
    ADMISSION_DOCUMENTS: "admissionDocuments",
    FACILITIES: "facilities",
    PROFILE: "profile",
    SETTINGS: "settings",
    LOGOUT: "logout",
}

const admissionScreenContainerType = {
    AGGRIDTABLE: "agGridTable",
    FORMDETAILCARD: "formDetailCard"
}

const admissionScreenApplicationStatus = {
    ALL: "all",
    NEW: "new",
    APPOINTMENT: "daily appointments",
    APPROVED: "approved",
    REJECTED: "rejected",
    CANCELED: "canceled",
}

const admissionScreenApplicationFormDetailStatus = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    CANCELED: "canceled",
}

const admissionScreenDocumentVerificationTypes = {
    REQUIRED: "required",
    OPTIONAL: "optional",
}

const admissionScreenApplicationStatusDropdown = {
    APPROVE: "approve",
    REJECT: "reject",
}

const appEnv = {
  SIT: "sit",
  UAT: "uat",
  MOCK: "mock",
  DEV: "development",
  PROD: "production",
};

const apiStatusCode = {
  200: 200,
  201: 201,
  400: 400,
  401: 401,
  403: 403,
  404: 404,
  409: 409,
  500: 500,
  503: 503,
};

export {
    variants,
    variantColor,
    sidebarMenuName,
    admissionScreenContainerType,
    admissionScreenApplicationStatus,
    admissionScreenApplicationFormDetailStatus,
    admissionScreenDocumentVerificationTypes,
    admissionScreenApplicationStatusDropdown,
    appEnv,
    apiStatusCode,
}