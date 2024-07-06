import { ReactNode } from "react";
import { motion } from "framer-motion"

export default function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 100
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      transition={{
        delay: .3,
      }}
    >
      {children}
    </motion.div >
  )
}