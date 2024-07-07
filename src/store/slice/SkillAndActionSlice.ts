/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import { Action } from "./AuthChartsSlice"

interface SKillAndActionProps {
  skillAndActionData: {
    id: number,
    userName: string,
    userEmail: string,
    userImage: string,
    reachName: string,
    skillName: string,
    actionDatas: Action[],
    days: number
  }
}

const initialState: SKillAndActionProps = {
  skillAndActionData: {
    id: -1,
    userName: '',
    userImage: '',
    userEmail: '',
    reachName: '',
    skillName: '',
    actionDatas: [],
    days: 0
  }
}

const skillAndActionSlice = createSlice({
  name: 'skillAndAction',
  initialState,
  reducers: {
    currentSkillAndAction(state, action) {
      state.skillAndActionData = action.payload
    }
  }
})

export const { currentSkillAndAction } = skillAndActionSlice.actions;
export default skillAndActionSlice.reducer;