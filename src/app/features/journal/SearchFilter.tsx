import styles from "./styles/SearchFilter.module.scss";

interface SearchTitle {
  searchTitle: string,
  searchName: string,
}

export default function SearchFilter({ searchTitle, searchName }: SearchTitle) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {searchTitle}
      </h2>
      <h3 className={styles.name}>
        {searchName}
      </h3>
    </div>
  )
}