import { createPortal } from "react-dom";

export default function ActionInputModalContainer ({ children }: { children: React.ReactNode }) {
  const target = document.querySelector('#create');
  if (target) {
    return createPortal(children, target);
  }
  return "error"
}