"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./styles/IssueCard.module.scss";

interface IssueCardProps {
  image: string,
  headline: string,
  description: string,
}

export default function IssueCard({ image, headline, description }: IssueCardProps) {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.image_container}
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: .2}}
        >
        <Image src={image} fill sizes='100%' alt='issue' />
      </motion.div>
      <div className={styles.text_container}>
        <h3 className={styles.headline}>
          {headline}
        </h3>
        <p className={styles.description}>
          {description}
        </p>
      </div>
      <span className={styles.holizon_line} />
    </div>
  )
}