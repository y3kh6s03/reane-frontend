import Image from "next/image";
import styles from "./Logo.module.scss"

interface Props {
  size: "sm" | "md" | "lg"
}

export default function Logo({ size }: Props) {
  return (
    <div className={`${styles.logo_container} ${styles[size]}`}>
      <Image
        className={styles.logo_container_img}
        src="/logo.svg"
        fill
        sizes="100%"
        alt="logo"
      />
    </div>
  )
}