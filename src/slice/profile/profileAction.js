import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setOrganizationMembersInformation,
} from "@MEUtils/apiResponse";
import {
  statesAPIRoute,
  schoolAboutAPIRoute,
  organizationMembersAPIRoute,
} from "@MEUtils/apiRoutes";
import {
  axiosInstance,
  apiResponseHaveData,
  isAPIServedSuccessfully,
} from "@MEUtils/axiosInstance";
import { setAuthData } from "@MEHelpers/authHelpers";

import _ from "lodash";

import { setLogin } from "@MERedux/authentication/authenticationSlice";

const getStates = createAsyncThunk(
  "profile/getStates",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(`${statesAPIRoute}`, {
        state: getState(),
        callPublicAPI: true,
      });

      if (apiResponseHaveData(response)) {
        return {
          data: _.get(response, "data", []),
          error: "",
        };
      } else {
        return {
          data: [],
          error:
            response && response.message
              ? response.message
              : "Failed to fetch states information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to fetch states information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const updateSchoolAbout = createAsyncThunk(
  "profile/updateSchoolAbout",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const { id, data } = payload;
      const response = await axiosInstance.put(
        `${schoolAboutAPIRoute}/${id}`,
        data,
        {
          state: getState(),
        },
      );

      if (apiResponseHaveData(response)) {
        const about = _.get(response, "data[0].about", "");
        const { authentication } = getState();
        const updatedUser = _.set(
          _.cloneDeep(authentication.user),
          "school.about",
          about,
        );

        dispatch(setLogin({ user: updatedUser, token: authentication.token }));
        setAuthData(updatedUser, authentication.token);

        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to update school about information",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to update school about information";
      return rejectWithValue({ error: errMsg });
    }
  },
);

const addOrganizationMember = createAsyncThunk(
  "profile/addOrganizationMember",
  async (payload, { getState, rejectWithValue, dispatch }) => {
    try {
      const { id, data } = payload;
      const response = await axiosInstance.post(
        `${organizationMembersAPIRoute}/${id}`,
        data,
        {
          state: getState(),
        },
      );

      if (apiResponseHaveData(response)) {
        const member = setOrganizationMembersInformation(_.get(response, "data", []));
        const { authentication } = getState();
        const updatedOrganizationMembers = _.concat(
          _.get(authentication.user, "organization.members", []),
          member,
        );
        const updatedUser = _.set(
          _.cloneDeep(authentication.user),
          "organization.members",
          updatedOrganizationMembers,
        );

        dispatch(setLogin({ user: updatedUser, token: authentication.token }));
        setAuthData(updatedUser, authentication.token);

        return {
          error: "",
        };
      } else {
        return {
          error:
            response && response.message
              ? response.message
              : "Failed to add organization member",
        };
      }
    } catch (error) {
      const errMsg =
        (error && (error.message || error.error)) ||
        "Failed to add organization member";
      return rejectWithValue({ error: errMsg });
    }
  },
);

export { updateSchoolAbout, getStates, addOrganizationMember };
