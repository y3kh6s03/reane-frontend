/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ActionData {
  name?: string,
  id?: number,
  isCompleted?: number
}

export interface SkillData {
  [skill: string]: ActionData[]
}

export type ChartData = {
  id: number;
  userName: string;
  userImage: string;
  userEmail: string;
  reachName: string;
  skills: SkillData,
  actionCount?: number;
  executedActionCount?: number;
  days: number;
  createdAt: string;
};

interface AuthChartState {
  authChartDatas: ChartData[] | null,
  loading: boolean,
  error: string | null,
}

const initialState: AuthChartState = {
  authChartDatas: null,
  loading: false,
  error: null
}

export const fetchAuthChartData = createAsyncThunk<ChartData[], { authEmail: string }>(
  'authChart/fetchAuthChartData',
  async ({ authEmail }) => {
    const res = await axios.post('http://localhost:3000/api/myChart', { authEmail });
    const data = await res.data
    return data;
  }
)

const authChartsSlice = createSlice({
  name: 'authChart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthChartData.fulfilled, (state, action: PayloadAction<ChartData[]>) => {
        state.authChartDatas = action.payload;
        state.loading = false;
      })
      .addCase(fetchAuthChartData.rejected, (state,) => {
        state.loading = false;
        state.error = "Failed to fetch data";
      })
  },
})

export default authChartsSlice.reducer;