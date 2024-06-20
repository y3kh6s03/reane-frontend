import IssueCard from "./IssueCard";
import styles from "./styles/Issue.module.scss";

const cards = [
  {
    image: '/issue1.png',
    headline: '未経験な分野の目標達成に必要なスキル、行動がわからない。',
    description: '未経験な分野であるほど、情報の精査がむずかしく、正確な計画を立てるのは困難',
  },
  {
    image: '/issue2.png',
    headline: '目標に向けた具体的なステップが不明瞭',
    description: '目標はあるけど、具体的な行動計画を立てられていない。',
  }
];

export default function Issue() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        こんな困り事ありませんか？
      </h2>
      <div className={styles.wrapper}>
        {
          cards.map((card) => <IssueCard key={card.image} {...card} />)
        }
      </div>
    </div>
  )
}