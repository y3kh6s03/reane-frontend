/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChartData } from "./AuthChartsSlice";
import { fetchAllUsersCharts } from "../thunks/AllUsersChartsThunk";


interface AllUsersChartsSliceProps {
  allUsersChartDatas: { [key: number]: ChartData } | null,
  selectedChartData: ChartData | null,
  loading: boolean,
  error: string | null
}

const initialState: AllUsersChartsSliceProps = {
  allUsersChartDatas: null,
  selectedChartData: null,
  loading: false,
  error: null
}

const allUsersChartsSlice = createSlice({
  name: "allUsersCharts",
  initialState,
  reducers: {
    getChartById(state, action: PayloadAction<number>) {
      const chartId = action.payload;
      const chartData = state.allUsersChartDatas && state.allUsersChartDatas[chartId];
      state.selectedChartData = chartData;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersCharts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersCharts.fulfilled, (state, action) => {
        state.allUsersChartDatas = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsersCharts.rejected, (state) => {
        state.loading = false;
        state.error = "チャートの取得に失敗しました。"
      })
  }
})

export const { getChartById } = allUsersChartsSlice.actions;
export default allUsersChartsSlice.reducer;