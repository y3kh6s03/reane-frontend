import FeatureCard from "./FeatureCard";
import styles from "./styles/Features.module.scss";

const features = [
  {
    number: '01',
    headline: '具体的な行動計画の作成',
    description: '目標達成に必要な8つの要素と、それぞれの要素に対する具体的な行動目標を設定することで、明確で実行可能な計画を立てられます。',
    image: '/plan.png'
  },
  {
    number: '02',
    headline: '進捗の可視化とフィードバック',
    description: '行動の進捗状況をチェックマークで可視化し、定期的に振り返りと修正を行うことで、効果的に目標達成をサポートします。',
    image: '/fb.png'
  },
  {
    number: '03',
    headline: 'コミュニティベースの目標達成支援',
    description: '他のユーザーが作成したマンダラチャートを共有・参照することで、自分の目標達成に役立つ情報やアイデアを得ることができます。',
    image: '/community.png'
  },
]

export default function Features() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        ３つの特徴
      </h2>
      <div className={styles.features_container}>
        {
          features.map((feature, index) => <FeatureCard key={feature.number} {...feature} index={index} />)
        }
      </div>
    </div>
  )
}