import Link from "next/link";

import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import { HowToButton } from "@/components/elements/button/Button";

import styles from "./styles/Start.module.scss"

export default function Start() {
  const { setIsHowToModal } = useIsHowToModal();

  return (
    <div className={styles.start_container}>
      <div className={styles.howToButton_container}>
        <h4>
          How to Use Reane !?
        </h4>
        <HowToButton setIsHowToModal={setIsHowToModal} />
      </div>
      <div className={styles.letStart_container}>
        <h4>
          Let&apos;s Get Started with REANE !!
        </h4>
        <Link className={styles.pagetop} href="#loginForm">
          <span className={styles.pagetop_arrow} />
        </Link>
      </div>
    </div>
  )
}