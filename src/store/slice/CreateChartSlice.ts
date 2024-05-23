/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ActionData {
  [action: string]: number
}
interface SkillData {
  [skill: string]: ActionData[]
}

type CreateChartProps = {
  userName: string;
  userImage: string;
  userEmail: string;
  reachName: string;
  skills: SkillData,
  actionCount?: number;
  executedActionCount?: number;
  days: number;
};

interface ReachPayload {
  reachPaylord: {
    userName: string,
    userImage: string,
    userEmail: string,
    reachName: string,
  }
}
export interface AddAction {
  id: number,
  name: string,
}
interface AddChartPayload {
  skillName: string;
  actionDatas?: AddAction[];
}

const initialState: CreateChartProps = {
  userName: '',
  userImage: '',
  userEmail: '',
  days: 0,
  reachName: '',
  skills: {},
  actionCount: 0,
  executedActionCount: 0,
}

const createChartSlice = createSlice({
  name: "createChart",
  initialState,
  reducers: {

    addReach(state, action: PayloadAction<ReachPayload>) {
      const { reachPaylord } = action.payload;
      state.reachName = reachPaylord.reachName;
      state.userName = reachPaylord.userName;
      state.userImage = reachPaylord.userImage;
      state.userEmail = reachPaylord.userEmail;
    },

    addSkill(state, action: PayloadAction<AddChartPayload>) {
      const { skillName } = action.payload;
      state.skills[skillName] = []
    },

    addActions(state, action: PayloadAction<AddChartPayload>) {
      const { skillName, actionDatas } = action.payload;
      const actions = actionDatas?.map(actionData => actionData.name);
      const insertActions = actions?.map((actionName) => ({ [actionName]: 0 }))
      const currentActions = [...state.skills[skillName]]
      if (currentActions && insertActions) {
        state.skills[skillName] = [...currentActions, ...insertActions]
      }
    },

    initCreateChart() {
      return initialState
    }
  },
})

export const { addSkill, addActions, addReach, initCreateChart } = createChartSlice.actions;
export default createChartSlice.reducer;