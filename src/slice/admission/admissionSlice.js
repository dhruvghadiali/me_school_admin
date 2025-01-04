import { createSlice } from "@reduxjs/toolkit";
import { responseMessage } from "@MEUtils/responseMessage";

import {
  admissionForm,
  documentVerificationList,
} from "@MERedux/admission/admissionAction";
import {
  admissionScreenContainerType,
  admissionScreenApplicationStatus,
} from "@MEUtils/enums";
import {
  defaultAdmissionFormData,
  defaultAdmissionFormDetail,
  defaultAdmissionVerificationDocuments,
} from "@MERedux/admission/admissionDefaultStateValues";

import _ from "lodash";

export const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    tableData: defaultAdmissionFormData,
    documentVerificationList: defaultAdmissionVerificationDocuments,
    applicationStatus: admissionScreenApplicationStatus.ALL,
    tableDataLoader: false,
    documentVerificationLoader: false,
    tableDataError: "",
    documentVerificationError: "",
    containerType: admissionScreenContainerType.AGGRIDTABLE,
    applicationFormDetail: defaultAdmissionFormDetail,
  },
  reducers: {
    resetState: (state, _) => {
      state.tableData = defaultAdmissionFormData;
      state.documentVerificationList = defaultAdmissionVerificationDocuments;
      state.applicationFormDetail= defaultAdmissionFormDetail;
      state.containerType = admissionScreenContainerType.AGGRIDTABLE;
      state.applicationStatus = admissionScreenApplicationStatus.ALL;
      state.tableDataLoader = false;
      state.documentVerificationLoader = false;
      state.tableDataError = "";
      state.documentVerificationError = "";
    },
    setAdmissionScreenContainerType: (state, action) => {
      state.containerType = action.payload;
    },
    setApplicationStatusFilter: (state, action) => {
      state.applicationStatus = action.payload;
    },
    setApplicationFormDetail: (state, action) => {
      state.applicationFormDetail = action.payload;
    },
    setDocumentVerificationStatus: (state, action) => {
      let tableDataIndex = _.findIndex(
        state.tableData,
        (data) =>
          data.applicationNumber ==
          state.applicationFormDetail.applicationNumber
      );

      let documentVerificationIndex = _.findIndex(
        state.applicationFormDetail.applicationDetails.documentVerification,
        (document) => document.documentId == action.payload.docId
      );

      if (documentVerificationIndex != -1) {
        let documentVerification =
          state.applicationFormDetail.applicationDetails.documentVerification;
        documentVerification[documentVerificationIndex].isDocumentValidated =
          action.payload.status;
        state.applicationFormDetail.applicationDetails.documentVerification =
          documentVerification;
      } else {
        let documentVerification =
          state.applicationFormDetail.applicationDetails.documentVerification;
        documentVerification = [
          ...documentVerification,
          {
            documentId: action.payload.docId,
            isDocumentValidated: action.payload.status,
          },
        ];
        state.applicationFormDetail.applicationDetails.documentVerification =
          documentVerification;
      }

      if (tableDataIndex != -1) {
        let tableData = state.tableData;
        tableData[tableDataIndex] = state.applicationFormDetail;
        state.tableData = tableData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admissionForm.pending, (state, _) => {
        state.tableData = defaultAdmissionFormData;
        state.tableDataLoader = true;
        state.tableDataError = "";
      })
      .addCase(admissionForm.fulfilled, (state, action) => {
        state.tableDataLoader = false;
        state.tableDataError = "";
        state.tableData = action.payload;
      })
      .addCase(admissionForm.rejected, (state, action) => {
        state.tableData = defaultAdmissionFormData;
        state.tableDataLoader = false;
        state.tableDataError =
          action.payload || responseMessage.somethingWentWrong;
      })
      .addCase(documentVerificationList.pending, (state, _) => {
        state.documentVerificationList = defaultAdmissionFormData;
        state.documentVerificationLoader = true;
        state.documentVerificationError = "";
      })
      .addCase(documentVerificationList.fulfilled, (state, action) => {
        state.documentVerificationLoader = false;
        state.documentVerificationError = "";
        state.documentVerificationList = action.payload;
      })
      .addCase(documentVerificationList.rejected, (state, action) => {
        state.documentVerificationList = defaultAdmissionFormData;
        state.documentVerificationLoader = false;
        state.documentVerificationError =
          action.payload || responseMessage.somethingWentWrong;
      });
  },
});

export const {
  resetState,
  setApplicationFormDetail,
  setApplicationStatusFilter,
  setDocumentVerificationStatus,
  setAdmissionScreenContainerType,
} = admissionSlice.actions;

export default admissionSlice.reducer;
