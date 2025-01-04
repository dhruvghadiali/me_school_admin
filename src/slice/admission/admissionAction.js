import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  mockAdmissionFormData,
  mockAdmissionVerificationDocuments,
} from "@MERedux/admission/mockResponse";

import _ from "lodash";

export const admissionForm = createAsyncThunk(
  "admission/admissionForm",
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
            resolve(mockAdmissionFormData);
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

export const documentVerificationList = createAsyncThunk(
  "admission/documentVerificationList",
  async (params, { rejectWithValue }) => {
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
            resolve(mockAdmissionVerificationDocuments);
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
