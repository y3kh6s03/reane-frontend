import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchJournal } from "../../../../store/thunks/journalThunks";

export default function useJournalData() {
  const router = useRouter();
  const [isJournalModal, setIsJournalModal] = useState(false);
  const { authChartDatas } = useAppSelector(state => state.authChart);
  const pathName = usePathname();
  const pathReachName = decodeURIComponent(pathName.substring(1)).split('/')[1];
  const pathSkillName = decodeURIComponent(pathName.substring(1)).split('/')[2];
  const journalChartData = authChartDatas?.find(chartData => chartData.reachName === pathReachName);

  const actionNames = journalChartData?.skills[pathSkillName]?.actions.map((deta) => deta.name) || [];

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (journalChartData) {
      const fetchJournalPayload = {
        user_email: journalChartData.userEmail
      }
      dispatch(fetchJournal(fetchJournalPayload));
    }
  }, [dispatch, journalChartData]);

  const journals = useAppSelector(state => state.journal.journals);

  const journalInputModalProps = {
    userEmail: journalChartData?.userEmail || '',
    id: journalChartData !== undefined ? journalChartData.id : -1,
    reachName: journalChartData?.reachName || '',
    skillId: journalChartData?.skills[pathSkillName]?.id || -1,
    skillName: pathSkillName,
    actionNames,
    setIsJournalModal,
  }

  return { router, journals, journalInputModalProps, isJournalModal, setIsJournalModal }
}