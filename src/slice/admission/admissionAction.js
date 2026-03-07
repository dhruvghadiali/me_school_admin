import { createAsyncThunk } from "@reduxjs/toolkit";

import _ from "lodash";

import { axiosInstance, apiResponseHaveData } from "@MEUtils/axiosInstance";
import {
  verifyDocumentsAPIRoute,
  admissionApplicationsAPIRoute,
  schoolAcademicClassesAPIRoute,
  feePaymentAppointmentBookingAPIRoute,
  documentVerificationAppointmentBookingAPIRoute,
  rescheduleDocumentVerificationAppointmentAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  admissionApplicationsAPIResponse,
  updateDocumentVerificationAPIResponse,
  eductionBoardsWithAcademicClassesAPIResponse,
  updatedAdmissionApplicationStatusAPIResponse,
  updateFeePaymentAppointmentBookingAPIResponse,
  updateDocumentVerificationAppointmentBookingAPIResponse,
} from "@MEUtils/apiResponse";
import {
  updateDocumentVerificationAPIPayload,
  feePaymentAppointmentBookingAPIPayload,
  documentVerificationAppointmentBookingAPIPayload,
} from "@MEUtils/apiPayload";

const getAdmissionApplications = createAsyncThunk(
  "admission/getAdmissionApplications",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        payload
          ? `${admissionApplicationsAPIRoute}?${payload}`
          : admissionApplicationsAPIRoute,
        { state: getState() },
      );

      if (apiResponseHaveData(response)) {
        return {
          admissionApplications: admissionApplicationsAPIResponse(
            response.data,
          ),
          error: "",
        };
      } else {
        return {
          admissionApplications: [],
          error:
            response && response.message
              ? response.message
              : "Admission application request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Admission application request failed";
      return rejectWithValue({
        error: errMsg,
      });
    }
  },
);

const getAcademicClasses = createAsyncThunk(
  "admission/getAcademicClasses",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      let school = "";
      let eductionBoardsWithAcademicClasses = [];
      if (
        getState() &&
        getState().authentication &&
        getState().authentication.user
      ) {
        let user = getState().authentication.user;

        if (
          user.school &&
          user.school.id &&
          user.school.educationBoards &&
          _.size(user.school.educationBoards) > 0
        ) {
          school = user.school.id;

          const response = await axiosInstance.get(
            `${schoolAcademicClassesAPIRoute}/${school}`,
            { state: getState() },
          );

          if (apiResponseHaveData(response)) {
            return {
              eductionBoardsWithAcademicClasses:
                eductionBoardsWithAcademicClassesAPIResponse(response.data),
              error: "",
            };
          } else {
            return {
              eductionBoardsWithAcademicClasses,
              error:
                response && response.message
                  ? response.message
                  : "No academic classes found",
            };
          }
        } else {
          return {
            eductionBoardsWithAcademicClasses,
            error: "No school or education boards found for the user",
          };
        }
      } else {
        return {
          eductionBoardsWithAcademicClasses,
          error: "No authenticated user found",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Get academic classes request failed";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const updateAdmissionApplicationStatus = createAsyncThunk(
  "admission/updateAdmissionApplicationStatus",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { applicationId, status, remarks } = payload;
      let admissionApplications =
        getState()?.admissionApplication?.admissionApplications || [];
      let selectedAdmissionApplication =
        getState()?.admissionApplication?.selectedAdmissionApplication || {};
      const response = await axiosInstance.put(
        `${admissionApplicationsAPIRoute}/${applicationId}/status`,
        { status, remarks },
        { state: getState() },
      );

      if (apiResponseHaveData(response)) {
        if (response.data?.[0]) {
          const admissionFormData =
            updatedAdmissionApplicationStatusAPIResponse(response.data[0]);
          admissionApplications = _.map(admissionApplications, (application) =>
            application.id === admissionFormData.id
              ? { ...application, ...admissionFormData }
              : application,
          );
          selectedAdmissionApplication = {
            ...selectedAdmissionApplication,
            ...admissionFormData,
          };
        }

        return {
          admissionApplications,
          selectedAdmissionApplication,
          error: "",
        };
      } else {
        return {
          admissionApplications: admissionApplications,
          selectedAdmissionApplication: selectedAdmissionApplication,
          error:
            response && response.message
              ? response.message
              : "Update admission application status request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Update admission application status request failed";
      return rejectWithValue({
        error: errMsg,
      });
    }
  },
);

const documentVerificationAppointmentBooking = createAsyncThunk(
  "admission/documentVerificationAppointmentBooking",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { applicationId } = payload;
      let admissionApplications =
        getState()?.admissionApplication?.admissionApplications || [];
      let selectedAdmissionApplication =
        getState()?.admissionApplication?.selectedAdmissionApplication || {};
      const response = await axiosInstance.put(
        `${admissionApplicationsAPIRoute}/${applicationId}${documentVerificationAppointmentBookingAPIRoute}`,
        documentVerificationAppointmentBookingAPIPayload(payload),
        { state: getState() },
      );

      if (apiResponseHaveData(response)) {
        if (response.data?.[0]) {
          const admissionFormData =
            updateDocumentVerificationAppointmentBookingAPIResponse(
              response.data[0],
            );

          admissionApplications = _.map(admissionApplications, (application) =>
            application.id === admissionFormData.id
              ? { ...application, ...admissionFormData }
              : application,
          );
          selectedAdmissionApplication = {
            ...selectedAdmissionApplication,
            ...admissionFormData,
          };
        }

        return {
          admissionApplications,
          selectedAdmissionApplication,
          error: "",
        };
      } else {
        return {
          admissionApplications: admissionApplications,
          selectedAdmissionApplication: selectedAdmissionApplication,
          error:
            response && response.message
              ? response.message
              : "Document verification appointment booking request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Document verification appointment booking request failed";
      return rejectWithValue({
        error: errMsg,
      });
    }
  },
);

const rescheduleDocumentVerificationAppointmentBooking = createAsyncThunk(
  "admission/rescheduleDocumentVerificationAppointmentBooking",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { applicationId } = payload;
      let admissionApplications =
        getState()?.admissionApplication?.admissionApplications || [];
      let selectedAdmissionApplication =
        getState()?.admissionApplication?.selectedAdmissionApplication || {};
      const response = await axiosInstance.put(
        `${admissionApplicationsAPIRoute}/${applicationId}${rescheduleDocumentVerificationAppointmentAPIRoute}`,
        documentVerificationAppointmentBookingAPIPayload(payload),
        { state: getState() },
      );

      if (apiResponseHaveData(response)) {
        if (response.data?.[0]) {
          const admissionFormData =
            updateDocumentVerificationAppointmentBookingAPIResponse(
              response.data[0],
            );

          admissionApplications = _.map(admissionApplications, (application) =>
            application.id === admissionFormData.id
              ? { ...application, ...admissionFormData }
              : application,
          );
          selectedAdmissionApplication = {
            ...selectedAdmissionApplication,
            ...admissionFormData,
          };
        }

        return {
          admissionApplications,
          selectedAdmissionApplication,
          error: "",
        };
      } else {
        return {
          admissionApplications: admissionApplications,
          selectedAdmissionApplication: selectedAdmissionApplication,
          error:
            response && response.message
              ? response.message
              : "Document verification reschedule appointment booking request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Document verification reschedule appointment booking request failed";
      return rejectWithValue({
        error: errMsg,
      });
    }
  },
);

const updatedVerifiedDocument = createAsyncThunk(
  "admission/updatedVerifiedDocument",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { applicationId, documentList } = payload;
      let admissionApplications =
        getState()?.admissionApplication?.admissionApplications || [];
      let selectedAdmissionApplication =
        getState()?.admissionApplication?.selectedAdmissionApplication || {};
      const response = await axiosInstance.put(
        `${admissionApplicationsAPIRoute}/${applicationId}${verifyDocumentsAPIRoute}`,
        updateDocumentVerificationAPIPayload(documentList),
        { state: getState() },
      );

      if (apiResponseHaveData(response)) {
        if (response.data?.[0]) {
          const admissionFormData = updateDocumentVerificationAPIResponse(
            response.data[0],
          );

          admissionApplications = _.map(admissionApplications, (application) =>
            application.id === admissionFormData.id
              ? { ...application, ...admissionFormData }
              : application,
          );
          selectedAdmissionApplication = {
            ...selectedAdmissionApplication,
            ...admissionFormData,
          };
        }

        return {
          admissionApplications,
          selectedAdmissionApplication,
          error: "",
        };
      } else {
        return {
          admissionApplications: admissionApplications,
          selectedAdmissionApplication: selectedAdmissionApplication,
          error:
            response && response.message
              ? response.message
              : "Document verification appointment booking request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Update verified document request failed";
      return rejectWithValue({
        error: errMsg,
      });
    }
  },
);

const feePaymentAppointmentBooking = createAsyncThunk(
  "admission/feePaymentAppointmentBooking",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { applicationId } = payload;
      let admissionApplications =
        getState()?.admissionApplication?.admissionApplications || [];
      let selectedAdmissionApplication =
        getState()?.admissionApplication?.selectedAdmissionApplication || {};
      const response = await axiosInstance.put(
        `${admissionApplicationsAPIRoute}/${applicationId}${feePaymentAppointmentBookingAPIRoute}`,
        feePaymentAppointmentBookingAPIPayload(payload),
        { state: getState() },
      );

      if (apiResponseHaveData(response)) {
        if (response.data?.[0]) {
          const admissionFormData =
            updateFeePaymentAppointmentBookingAPIResponse(
              response.data[0],
            );

          admissionApplications = _.map(admissionApplications, (application) =>
            application.id === admissionFormData.id
              ? { ...application, ...admissionFormData }
              : application,
          );
          selectedAdmissionApplication = {
            ...selectedAdmissionApplication,
            ...admissionFormData,
          };
        }

        return {
          admissionApplications,
          selectedAdmissionApplication,
          error: "",
        };
      } else {
        return {
          admissionApplications: admissionApplications,
          selectedAdmissionApplication: selectedAdmissionApplication,
          error:
            response && response.message
              ? response.message
              : "Fee payment appointment booking request failed",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Fee payment appointment booking request failed";
      return rejectWithValue({
        error: errMsg,
      });
    }
  },
);

export {
  getAcademicClasses,
  updatedVerifiedDocument,
  getAdmissionApplications,
  feePaymentAppointmentBooking,
  updateAdmissionApplicationStatus,
  documentVerificationAppointmentBooking,
  rescheduleDocumentVerificationAppointmentBooking,
};
