import { mockSummaryData } from "./mockResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
            await res.json();
            resolve(mockSummaryData);
          } catch (error) {
            reject(error);
          }
        }, 2000); // 2 seconds delay
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
