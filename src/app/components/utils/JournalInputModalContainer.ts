import { createPortal } from "react-dom";

export default function JournalInputModalContainer ({ children }: { children: React.ReactNode }) {
  const target = document.querySelector('#journal');
  if (target) {
    return createPortal(children, target);
  }
  return "error"
}