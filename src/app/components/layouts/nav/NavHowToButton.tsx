"use client"

import HowToModal from "@/components/elements/Modal/HowToModal/HowToModal";
import { HowToButton } from "@/components/elements/button/Button";
import { useIsHowToModal } from "@/components/utils/IsHowToModalProvider";
import ModalContainer from "@/components/utils/ModalContainer";

export default function NavHowToButton() {
  const { isHowToModal, setIsHowToModal } = useIsHowToModal();
  return (
    <div
      id="nav-HowToButton"
      style={{
        width: '10rem'
      }}
    >
      <HowToButton setIsHowToModal={setIsHowToModal} />
      {
        isHowToModal
        &&
        <ModalContainer targetName="nav-HowToButton">
          <HowToModal />
        </ModalContainer>
      }
    </div>
  )
}