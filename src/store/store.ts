
// store作成するための関数をインポート
import { configureStore } from "@reduxjs/toolkit";
// store管理するsliceを読み込み
import AuthChartsReducer from "./slice/AuthChartsSlice";
import UserChartsReducer from "./slice/UserChartsSlice";
import CreateChartReducer from "./slice/CreateChartSlice";
import SkillAndActionReducer from "./slice/SkillAndActionSlice";

export const store = configureStore({
  reducer: {
    authChart: AuthChartsReducer,
    usersChart: UserChartsReducer,
    createChart: CreateChartReducer,
    skillAndAction: SkillAndActionReducer
  }
})

// sliceとstoreで定義したことによって型推論してくれたものを型定義として利用できるようにtype定義する
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>