/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JournalProps, JournalSliceProps } from "../types/journalTypes";
import { fetchJournal, registerJournal } from "../thunks/journalThunk";

const initialState: JournalSliceProps = {
  journals: null,
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
        state.error = null;
      })
      .addCase(registerJournal.fulfilled, (state, action: PayloadAction<JournalProps>) => {
        state.journals = state.journals !== null
          ?
          [action.payload, ...state.journals]
          :
          [action.payload]
          ;
        state.loading = false;
      })
      .addCase(registerJournal.rejected, (state) => {
        state.loading = false;
        state.error = "journalの登録に失敗しました。";
      })

      .addCase(fetchJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJournal.fulfilled, (state, action: PayloadAction<JournalProps[]>) => {
        state.journals = action.payload;
        state.loading = false;
      })
      .addCase(fetchJournal.rejected, (state) => {
        state.loading = false;
        state.error = "journalの取得に失敗しました。"
      })
  }
})

// export const { registerJournal } = jouranelSlice.actions;
export default jouranelSlice.reducer;