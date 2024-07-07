/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Action } from "./AuthChartsSlice";
// import { SkillData } from "./AuthChartsSlice";
export interface CreateSkills {
  [skill: string]: {
    id?: number,
    actions: Action[]
  }
}
interface CreateChartProps {
  userName: string;
  userImage: string;
  userEmail: string;
  reachName: string;
  skills: CreateSkills,
  actionCount?: number;
  executedActionCount?: number;
  days: number;
};

interface CreateReachPayload {
  reachPaylord: {
    userName: string,
    userImage: string,
    userEmail: string,
    reachName: string,
  }
}
export interface CreateAddAction {
  id: number,
  name: string,
}
interface CreateAddChartPayload {
  skillName: string,
  addActions?: CreateAddAction[],
}

interface CreateDeleteSkillNamePayload {
  skillName: string
}

interface CreateEditSkillNamePayload {
  currentSkillName: string,
  newSkillName: string,
}

interface CreateEditActionNamePayload {
  skillName: string,
  index: number,
  newActionName: string,
}

interface CreateDeleteActionNamePayload {
  skillName: string,
  index: number,
}

interface QuoteCreateChartPayload {
  userName: string,
  userImage: string,
  userEmail: string,
  reachName: string,
  skills: CreateSkills,
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

    addCreateReach(state, action: PayloadAction<CreateReachPayload>) {
      const { reachPaylord } = action.payload;
      state.reachName = reachPaylord.reachName;
      state.userName = reachPaylord.userName;
      state.userImage = reachPaylord.userImage;
      state.userEmail = reachPaylord.userEmail;
    },

    addCreateSkill(state, action: PayloadAction<CreateAddChartPayload>) {
      const { skillName } = action.payload;
      state.skills[skillName] = { actions: [] }
    },

    addCreateActions(state, action: PayloadAction<CreateAddChartPayload>) {
      const { skillName, addActions } = action.payload;
      const actionNames = addActions?.map(addAction => addAction.name);
      const insertActions = actionNames?.map((actionName) => ({
        name: actionName,
        is_completed: 0
      }))
      const currentActions = [...state.skills[skillName].actions]
      if (currentActions && insertActions) {
        state.skills[skillName].actions = [...currentActions, ...insertActions]
      }
    },

    editCreateSkillName(state, action: PayloadAction<CreateEditSkillNamePayload>) {
      const { currentSkillName, newSkillName } = action.payload;
      const currentSkillNameActions = [...state.skills[currentSkillName].actions]
      delete state.skills[currentSkillName];
      state.skills[newSkillName] = { actions: [...currentSkillNameActions] }
    },

    deleteCreateSkillName(state, action: PayloadAction<CreateDeleteSkillNamePayload>) {
      const { skillName } = action.payload;
      delete state.skills[skillName];
    },

    editCreateActionName(state, action: PayloadAction<CreateEditActionNamePayload>) {
      const { skillName, index, newActionName } = action.payload;
      state.skills[skillName].actions[index] = {
        name: newActionName,
        is_completed: 0
      }
    },

    deleteCreateActionName(state, action: PayloadAction<CreateDeleteActionNamePayload>) {
      const { skillName, index } = action.payload;
      state.skills[skillName].actions.splice(index, 1);
    },

    initCreateChart() {
      return initialState
    },

    quoteCreateChart(state, action: PayloadAction<QuoteCreateChartPayload>) {
      const { userEmail, userImage, userName, reachName, skills } = action.payload;
      state.reachName = reachName;
      state.userEmail = userEmail;
      state.userName = userName;
      state.userImage = userImage;
      state.skills = skills
    }
  },
})

export const { addCreateSkill, addCreateActions, addCreateReach, initCreateChart, editCreateSkillName, deleteCreateSkillName, editCreateActionName, deleteCreateActionName, quoteCreateChart } = createChartSlice.actions;
export default createChartSlice.reducer;