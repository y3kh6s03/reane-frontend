/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { ChartData } from "./AuthChartsSlice";
import { FetchAllUsersChartsProps, fetchAllUsersCharts } from "../thunks/AllUsersChartsThunk";
import { ChartData } from "./AuthChartsSlice";

interface AllUsersChartsSliceProps {
  allUsersChartsDatas: FetchAllUsersChartsProps
  selectedChartData: ChartData | null,
  loading: boolean,
  error: string | null
}

const initialState: AllUsersChartsSliceProps = {
  allUsersChartsDatas: {
    data: null,
    current_page: 1,
    last_page: -1,
    per_page: -1,
    total: -1,
  },
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
      const chartData = state.allUsersChartsDatas.data && state.allUsersChartsDatas.data.find(charData => charData.id === chartId);
      if (chartData) {
        state.selectedChartData = chartData;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersCharts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersCharts.fulfilled, (state, action) => {
        state.allUsersChartsDatas = action.payload;
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