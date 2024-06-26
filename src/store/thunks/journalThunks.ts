/* eslint-disable import/prefer-default-export */

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JournalPayloadProps, JournalProps } from "../types/journalTypes";

export const registerJournal = createAsyncThunk<JournalProps, JournalPayloadProps>(
  'journal/createJournal',
  async (journalPayload) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/journal/store`, journalPayload);
    const data = await res.data
    return data;
  }
)

export const fetchJournal = createAsyncThunk<JournalProps[], { user_email: string }>(
  'journal/fetchJournal',
  async (fetchJournalPayload) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/journal`, { ...fetchJournalPayload });
    const data = await res.data;
    return data;
  }
)