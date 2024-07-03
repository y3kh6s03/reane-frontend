
// store作成するための関数をインポート
import { configureStore } from "@reduxjs/toolkit";
// store管理するsliceを読み込み
import AuthChartsReducer from "./slice/AuthChartsSlice";
import AllUsersChartsReducer from "./slice/AllUsersChartsSlice";
import CreateChartReducer from "./slice/CreateChartSlice";
import SkillAndActionReducer from "./slice/SkillAndActionSlice";
import JournalReducer from "./slice/journalSlice";

export const store = configureStore({
  reducer: {
    authChart: AuthChartsReducer,
    AllUsersChart: AllUsersChartsReducer,
    createChart: CreateChartReducer,
    skillAndAction: SkillAndActionReducer,
    journal: JournalReducer,
  }
})

// sliceとstoreで定義したことによって型推論してくれたものを型定義として利用できるようにtype定義する
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>