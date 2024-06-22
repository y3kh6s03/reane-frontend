"use client"

import HowToModal from "@/components/elements/Modal/HowToModal";
import { HowToButton } from "@/components/elements/button/Button";
import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import ModalContainer from "@/components/utils/ModalContainer";

export default function HeaderHowToButton() {
  const { isHowToModal, setIsHowToModal } = useIsHowToModal();
  return (
    <div
      id="header-HowToButton"
      style={{
        width: '10rem'
      }}
    >
      <HowToButton setIsHowToModal={setIsHowToModal} />
      {
        isHowToModal
        &&
        <ModalContainer targetName="header-HowToButton">
          <HowToModal />
        </ModalContainer>
      }
    </div>
  )
}