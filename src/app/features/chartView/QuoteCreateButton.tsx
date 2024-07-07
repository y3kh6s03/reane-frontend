import Image from "next/image"

import { useRouter } from "next/navigation";
import { quoteCreateChart } from "@/../store/slice/CreateChartSlice";
import { useAppDispatch } from "@/../store/hooks";
import { SkillData } from "@/../store/slice/AuthChartsSlice";

import styles from "./styles/QuoteCreate.module.scss";

interface QuoteCreateChartPayLoad {
  quoteCreateChartPayLoad: {
    userName: string,
    userImage: string,
    userEmail: string,
    reachName: string,
    skills: SkillData,
  }
}

export default function QuoteCreateButton({ quoteCreateChartPayLoad }: QuoteCreateChartPayLoad) {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const handleQuoteCreate = () => {
    router.push("/create");
    dispatch(quoteCreateChart(quoteCreateChartPayLoad));
  }
  return (
    <button
      className={styles.createButton}
      type="button"
      onClick={() => { handleQuoteCreate() }}
    >
      <Image src="/create.svg" fill sizes="100%" alt="create" />
    </button>
  )
}