"use client"

import Image from "next/image";
import { motion } from "framer-motion"
import styles from "./styles/FeatureCard.module.scss";

interface FeatureCardProps {
  index: number,
  number: string,
  headline: string,
  description: string,
  image: string
}

export default function FeatureCard({ index, number, headline, description, image }: FeatureCardProps) {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.image_container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .2 * (index + 1) }}
      >
        <Image src={image} fill sizes="100%" alt="feature" />
      </motion.div>
      <div className={styles.text_container}>
        <span className={styles.number}>
          {number}
        </span>
        <h3 className={styles.headline}>
          {headline}
        </h3>
        <p className={styles.description}>
          {description}
        </p>
      </div>
    </div>
  )
}