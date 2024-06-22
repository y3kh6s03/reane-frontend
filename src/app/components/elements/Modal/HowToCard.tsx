import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import styles from "./styles/HowTo.module.scss";

interface HowToCardProps{
  number: string,
  title: string,
  description: string,
  image: string,
}

export default function HowToCard({number, title, description, image}:HowToCardProps) {
  const { setIsHowToModal } = useIsHowToModal();
  return (
    <div className={styles.content} >
      <h2 className={styles.modal_title}>
        <span className={styles.step}>
          {number}<br />
        </span>
        {title}
      </h2>
      <p className={styles.description}>
        {description}
      </p>
      <div className={styles.image_container}>
        {image}
        {/* <Image></Image> */}
      </div>
      <button
        type='submit'
        aria-label="Close"
        className={styles.close_button}
        onClick={() => {
          setIsHowToModal(prev => !prev)
        }}
      >
        <span className={styles.close_line1} />
        <span className={styles.close_line2} />
      </button>
    </div >
  )
}