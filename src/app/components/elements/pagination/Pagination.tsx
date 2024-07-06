

import { useAppDispatch } from "@/../store/hooks"
import { fetchAllUsersCharts } from "@/../store/thunks/AllUsersChartsThunk";

import styles from "./Pagination.module.scss"

interface PaginationProps {
  current_page: number,
  last_page: number,
}

export default function Pagination({ current_page, last_page }: PaginationProps) {
  const dispatch = useAppDispatch();
  const handleNextPageChart = (pageNumber: number) => {
    dispatch(fetchAllUsersCharts(pageNumber));
  }
  return (
    <ul className={styles.container}>
      {
        Array.from({ length: last_page }, (_, index) => index + 1).map(page => {
          const pageNumber = page
          return (
            <li
              key={pageNumber}
              className={styles.item}
            >
              <button
                type="button"
                className={styles.button}
                key={pageNumber}
                onClick={() => handleNextPageChart(pageNumber)}
                style={current_page === pageNumber ? { backgroundColor: "#DF8B74" } : {}}
              >
                {pageNumber}
              </button>
            </li>
          )
        })
      }
    </ul >
  )
}