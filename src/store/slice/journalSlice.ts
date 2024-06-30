/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JournalProps, JournalSliceProps } from "../types/journalTypes";
import { registerJournal } from "../thunks/journalThunks";



const initialState: JournalSliceProps = {
  journals: [{
    id: -1,
    reachName: '',
    skillName: '',
    actionNames: [''],
    description: ',',
  }],
  loading: false,
  error: null,
}

const jouranelSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerJournal.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(registerJournal.fulfilled, (state, action: PayloadAction<JournalProps[]>) => {
        state.journals = [...state.journals, ...action.payload]
        state.loading = false
      })
      .addCase(registerJournal.rejected, (state) => {
        state.loading = false;
        state.error = "journalの登録に失敗しました。"
      })
  }
})

// export const { registerJournal } = jouranelSlice.actions;
export { registerJournal }
export default jouranelSlice.reducer;