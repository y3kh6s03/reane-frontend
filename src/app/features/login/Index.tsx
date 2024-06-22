"use client"

import HowToModal from "@/components/elements/Modal/HowToModal";
import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import ModalContainer from "@/components/utils/ModalContainer";
import styles from "./styles/Login.module.scss"
import LoginHeader from "./LoginHeader";
import Description from "./Description";
import Issue from "./Issue";
import Features from "./Features";

export default function LoginIndex() {

  const { isHowToModal } = useIsHowToModal();

  return (
    <div className={styles.container} id="login">
      <LoginHeader />
      <Description />
      <Issue />
      <Features />
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