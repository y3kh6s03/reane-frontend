/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ActionData {
  [action: string]: number
}
export interface CreateSkillData {
  [skill: string]: {
    actions: ActionData[]
  }
}

type CreateChartProps = {
  userName: string;
  userImage: string;
  userEmail: string;
  reachName: string;
  skills: CreateSkillData,
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
  skillName: string,
  actionDatas?: AddAction[],
}

interface DeleteSkillNamePayload {
  skillName: string
}

interface EditSkillNamePayload {
  currentSkillName: string,
  newSkillName: string,
}

interface EditActionNamePayload {
  skillName: string,
  index: number,
  newActionName: string,
}

interface DeleteActionNamePayload {
  skillName: string,
  index: number,
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
      state.skills[skillName] = { actions: [] }
    },

    addActions(state, action: PayloadAction<AddChartPayload>) {
      const { skillName, actionDatas } = action.payload;
      const actions = actionDatas?.map(actionData => actionData.name);
      const insertActions = actions?.map((actionName) => ({ [actionName]: 0 }))
      const currentActions = [...state.skills[skillName].actions]
      if (currentActions && insertActions) {
        state.skills[skillName].actions = [...currentActions, ...insertActions]
      }
    },

    editSkillName(state, action: PayloadAction<EditSkillNamePayload>) {
      const { currentSkillName, newSkillName } = action.payload;
      const currentSkillNameActions = [...state.skills[currentSkillName].actions]
      delete state.skills[currentSkillName];
      state.skills[newSkillName] = { actions: [...currentSkillNameActions] }
    },

    deleteSkillName(state, action: PayloadAction<DeleteSkillNamePayload>) {
      const { skillName } = action.payload;
      delete state.skills[skillName]

    },

    editActionName(state, action: PayloadAction<EditActionNamePayload>) {
      const { skillName, index, newActionName } = action.payload;
      state.skills[skillName].actions[index] = { [newActionName]: 0 };
    },

    deleteActionName(state, action: PayloadAction<DeleteActionNamePayload>) {
      const { skillName, index } = action.payload;
      state.skills[skillName].actions.splice(index, 1);
    },

    initCreateChart() {
      return initialState
    }
  },
})

export const { addSkill, addActions, addReach, initCreateChart, editSkillName, deleteSkillName, editActionName, deleteActionName } = createChartSlice.actions;
export default createChartSlice.reducer;