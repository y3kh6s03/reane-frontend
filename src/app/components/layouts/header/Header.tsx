import Link from "next/link";
import IsHowToModalProvider from "@/components/utils/IsHowToModalProvider";
import Logo from "../../elements/logo/Logo";
import Logout from "../../elements/logout/Logout";
import styles from "./header.module.scss"
import HeaderHowToButton from "./HeaderHowToButton";

export default function Header() {
  return (
    <IsHowToModalProvider>
      <div className={styles.container}>
        <Link href='/myChart'>
          <Logo size="sm" />
        </Link>

        <div className={styles.header_inner}>
          <div className={styles.howToButton_container}>
            <HeaderHowToButton />
          </div>
          <Logout />
        </div>
      </div>
    </IsHowToModalProvider>
  )
}