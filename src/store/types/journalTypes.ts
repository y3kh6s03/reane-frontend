export interface JournalProps {
  journal_id: number,
  reach_id: number,
  reachName: string,
  skill_id: number,
  skillName: string,
  actions: {
    id: number,
    name: string
  }[],
  description: string,
  date: string
}

export interface JournalSliceProps {
  journals: JournalProps[] | null,
  loading?: boolean,
  error?: string | null,
}

export interface JournalPayloadProps {
  user_email: string,
  reach_id: number,
  skill_id: number,
  data: {
    actionNames: {
      select: string;
    }[];
    description: string;
  }
}