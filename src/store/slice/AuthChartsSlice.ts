/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ActionData {
  name: string,
  id: number,
  isCompleted: number
}

export interface SkillData {
  [skill: string]: {
    id?: number,
    actions: ActionData[]
  }
}

export interface ChartData {
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
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart`, { authEmail });
    const data = await res.data
    return data;
  }
)

const authChartsSlice = createSlice({
  name: 'authChart',
  initialState,
  reducers: {
    addedSkill(state, action) {
      const { id, skillName, reachId } = action.payload;
      const addSkillChartData = state.authChartDatas?.find((chartData: ChartData) => chartData.id === reachId);
      if (addSkillChartData) {
        addSkillChartData.skills[skillName] = {
          id,
          actions: []
        }
      }
    },
    deleteChart(state, action) {
      const id = action.payload;
      const targetIndex = state.authChartDatas?.findIndex(chartData => chartData.id === id);
      if (targetIndex !== -1 && typeof targetIndex === 'number') {
        state.authChartDatas?.splice(targetIndex, 1);
      }
    }
  },
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
export const { deleteChart, addedSkill } = authChartsSlice.actions;