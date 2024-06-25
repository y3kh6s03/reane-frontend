import Image from "next/image";
import Link from "next/link";

import IsHowToModalProvider from "@/components/utils/IsHowToModalProvider";
import Logo from "@/components/elements/logo/Logo";
import Logout from '../../elements/logout/Logout';
import NavHowToButton from "./NavHowToButton";

import styles from "./nav.module.scss";

interface Props {
  props: string
}

export default function Nav({ props }: Props) {

  const navItems = [
    { id: 1, name: 'home' },
    { id: 2, name: 'create' },
    { id: 3, name: 'myChart' },
    { id: 4, name: 'search' },
    { id: 5, name: 'setting' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo_container}>
        <Logo size="lg" />
      </div>
      <div className={styles.HowToButton_container}>
        <IsHowToModalProvider>
          <NavHowToButton />
        </IsHowToModalProvider>
      </div>
      <ul className={styles.nav_ul}>
        {
          navItems.map(item =>
            <li key={item.id} className={styles.nav_li}>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.name}`} className={styles.nav_li_link}>
                <div className={styles.image_container}>
                  <Image
                    className={styles.image_container_img}
                    src={item.name !== 'myChart' ? `/${item.name}.svg` : props} fill sizes='100%' alt={`${item.name}`}
                  />
                </div>
                <span className={styles.name}>
                  {item.name === 'myChart'
                    ? 'My Chart'
                    : item.name.charAt(0).toUpperCase() + item.name.slice(1)
                  }
                </span>
              </Link>
            </li>
          )
        }
        <li className={`${styles.nav_li} ${styles.nav_logout}`}>
          <Logout />
        </li>
      </ul>
    </nav>
  )
}