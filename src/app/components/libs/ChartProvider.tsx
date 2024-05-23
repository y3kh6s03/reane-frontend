"use client"

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

interface ChartProviderProps {
  children: ReactNode;
}

export default function ChartProvider({ children }: ChartProviderProps): JSX.Element {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}