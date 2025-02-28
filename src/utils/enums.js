import moment from "moment";

export const variants = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DANGER: "danger",
    WARNING: "warning",
    SUCCESS: "success",
    DARK: "dark",
};

export const variantColor = {
    PRIMARY: "#3b98ba",
    DANGER: "#ab4459",
    WARNING: "#d17615",
    SUCCESS: "#60b159",
    DARK: "#1b1b1d",
};

export const sidebarMenuName = {
    DASHBOARD: "dashboard",
    ADMISSION: "admission",
    PROFILE: "profile",
    SETTINGS: "settings",
    LOGOUT: "logout",
}

export const admissionScreenContainerType = {
    AGGRIDTABLE: "agGridTable",
    FORMDETAILCARD: "formDetailCard"
}

export const admissionScreenApplicationStatus = {
    ALL: "all",
    NEW: "new",
    APPOINTMENT: "daily appointments",
    APPROVED: "approved",
    REJECTED: "rejected",
    CANCELED: "canceled",
}

export const admissionScreenApplicationFormDetailStatus = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    CANCELED: "canceled",
}

export const admissionScreenDocumentVerificationTypes = {
    REQUIRED: "required",
    OPTIONAL: "optional",
}

export const admissionScreenApplicationStatusDropdown = {
    APPROVE: "approve",
    REJECT: "reject",
}