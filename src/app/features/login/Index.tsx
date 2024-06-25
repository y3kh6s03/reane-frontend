"use client"

import HowToModal from "@/components/elements/Modal/HowToModal";
import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import ModalContainer from "@/components/utils/ModalContainer";
import Description from "./Description";
import Issue from "./Issue";
import Features from "./Features";
import styles from "./styles/Login.module.scss"
import Start from "./Start";

export default function LoginIndex() {

  const { isHowToModal } = useIsHowToModal();

  return (
    <div
      className={styles.container}
      id="login"
      style={{
        width: "100%",
        maxWidth: "1440px",
        position: "relative"
      }}
    >
      <Description />
      <Issue />
      <Features />
      <Start />
      {
        isHowToModal
        &&
        <ModalContainer targetName="login">
          <HowToModal />
        </ModalContainer>
      }
    </div>
  )
}