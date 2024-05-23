import { createSlice } from "@reduxjs/toolkit";
import { ChartData } from "./AuthChartsSlice";

// 状態管理の値の型定義を行う
interface UserChartState {
  userChartData: ChartData
}
// 値の初期化
const initialState: UserChartState = {
  userChartData: {
    id: 123,
    userName: 'rei',
    userImage: '/defaultIcon.png',
    userEmail: 'example@gmail.com',
    days: 254,
    reachName: 'ベンチプレス888kg',
    skills:
    {
      "ダイエット": [
        {
          name: "カロリー摂取量を把握する",
          id: 1,
          isCompleted: 0
        }
      ],
    },
    actionCount: 999,
    executedActionCount: 444,
    createdAt: '2024-02-30',
  },
}
// sliceを定義する
const userChartsSlice = createSlice({
  name: "userChart",
  initialState,
  reducers: {},
})
// sliceで定義したreducersのプロパティ名がそのままactionのタイプとして指定することができる
// export const { increment, amoutAdd } = counterSlice.actions;
// storeで登録するためにここで作成したsliceを送信する
export default userChartsSlice.reducer;