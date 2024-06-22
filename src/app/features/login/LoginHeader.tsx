"use client"

import Logo from "@/components/elements/logo/Logo";
import { HowToButton } from "@/components/elements/button/Button";
import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import styles from "./styles/Header.module.scss"


export default function LoginHeader() {
  const { setIsHowToModal } = useIsHowToModal()

  return (
    <div className={styles.login_header} id="header">
      <div className={styles.header_icon}>
        <Logo size="lg" />
      </div>
      <HowToButton setIsHowToModal={setIsHowToModal} />
    </div>
  )
}