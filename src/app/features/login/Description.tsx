"use client"

import Logo from "@/components/elements/logo/Logo"
import { motion } from "framer-motion"
import styles from "./styles/Description.module.scss"

export default function Description() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Logo size='lg' />
        <span>とは？</span>
      </h1>
      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0}}
        transition={{duration: .5}}
      >
        さまざまな人が作成したマンダラチャートを共有、参考にすることで
        あなたの目標達成をサポートします。
      </motion.p>
    </div >
  )
}