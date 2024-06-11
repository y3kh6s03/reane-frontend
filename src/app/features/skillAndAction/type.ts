import { SetStateAction } from "react";

export interface ActionProps {
  reachName: string,
  skillName: string,
  actions: {
    id: number,
    name: string,
    isCompleted: number
  }[]
}

export interface ActionDeleteProps {
  reachName: string,
  skillName: string,
  actionName: string,
  actionId: number
}

export interface SetActionList {
  value: SetStateAction<{
    id: number;
    name: string;
    isCompleted: number;
  }[]>
}