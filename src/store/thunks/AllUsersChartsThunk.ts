/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { apiRouteAxios } from "@/components/utils/apiRouteAxios";
import { apiRouteAxios } from "@/components/utils/apiRouteAxios";
import { ChartData } from "../slice/AuthChartsSlice";

export const fetchAllUsersCharts = createAsyncThunk<{ [key: number]: ChartData }>(
  'allUsersCharts/fetchAllUsersCharts',
  async () => {
    const res = await apiRouteAxios.get("api/chart");
    const data = await res.data;
    return data
  }
)