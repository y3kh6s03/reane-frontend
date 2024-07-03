/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { apiRouteAxios } from "@/components/utils/apiRouteAxios";
import { ChartData } from "../slice/AuthChartsSlice";

export const fetchAllUsersCharts = createAsyncThunk<{ [key: number]: ChartData }>(
  'allUsersCharts/fetchAllUsersCharts',
  async () => {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
    const res = await axios.get(URL);
    const data = await res.data;
    return data
  }
)