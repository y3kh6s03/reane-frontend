import { createPortal } from "react-dom";

interface ModalContainerProps {
  targetName: string;
  children: React.ReactNode;
}

export default function ModalContainer({ targetName, children }: ModalContainerProps) {
  const target = document.querySelector(`#${targetName}`);
  if (target) {
    return createPortal(children, target);
  }
  return "error";
}