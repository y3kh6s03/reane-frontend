/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"
import { ActionData } from "./AuthChartsSlice"

interface SKillAndActionProps {
  skillAndActionData: {
    id: number,
    userName: string,
    userEmail: string,
    userImage: string,
    reachName: string,
    skillName: string,
    actionDatas: ActionData[],
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
    actionDatas: []
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