// src/redux/thunks/apiThunks.js
import { sendRequest } from "../Services/apiService";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "./apiSlice";

export const fetchDataThunk = (endpoint) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = await sendRequest("GET", endpoint);
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.toString()));
  }
};

export const postDataThunk = (endpoint, payload) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = await sendRequest("POST", endpoint, payload);
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.toString()));
  }
};

export const putDataThunk = (endpoint, payload) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = await sendRequest("PUT", endpoint, payload);
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.toString()));
  }
};

export const deleteDataThunk = (endpoint) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = await sendRequest("DELETE", endpoint);
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.toString()));
  }
};
