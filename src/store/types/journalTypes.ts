export interface JournalProps {
  id: number,
  reachName: string,
  skillName: string,
  actionNames: string[],
  description: string,
}

export interface JournalSliceProps {
  journals: JournalProps[],
  loading?: boolean,
  error?: string | null,
}

export interface JournalPayloadProps {
  reach_id: number,
  skill_id: number,
  data: {
    actionNames: {
      select: string;
    }[];
    description: string;
  }
}