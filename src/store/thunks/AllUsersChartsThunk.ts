/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { apiRouteAxios } from "@/components/utils/apiRouteAxios";
import { apiRouteAxios } from "@/components/utils/apiRouteAxios";
import { ChartData } from "../slice/AuthChartsSlice";

export const fetchAllUsersCharts = createAsyncThunk<ChartData[], number>(
  'allUsersCharts/fetchAllUsersCharts',
  async (pageNumber) => {
    const res = await apiRouteAxios.get(`api/home?page=${pageNumber}`);
    const data = await res.data;
    return data
  }
)