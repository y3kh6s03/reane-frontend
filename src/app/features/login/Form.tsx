import Image from "next/image";
import { signIn } from "@/../auth";
import Link from "next/link";
import styles from './styles/Form.module.scss';

export default function LoginForm() {
  const login = async () => {

    "use server"

    await signIn('google', { redirectTo: "/myChart" });
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        action={login}>
        <h1 className={styles.name}>
          REANE
        </h1>
        <div className={styles.image_container}>
          <Image
            src="https://next-auth.js.org/img/logo/logo-sm.png"
            fill
            sizes="100%"
            alt="icon"
          />
        </div>
        <span className={styles.form_title}>
          新規登録 / ログイン
        </span>
        <button type="submit" className={styles.form_button}>
          <div className={styles.google_container}>
            <Image src="/google.svg" fill sizes="100%" alt="google logo" />
          </div>
          <span>
            LOGIN
          </span>
        </button>
        <Link
          style={{
            font: "normal .8rem var(--font-jp)"
          }}
          href="/terms"
        >利用規約</Link>
        <Link
          style={{
            font: "normal .8rem var(--font-jp)"
          }}
          href="/privacy">プライバシーポリシー</Link>
      </form>

      <p className={styles.description}>
        利用規約およびプライバシーポリシーに同意の上、ログインへお進みください。
      </p>

      <div className={styles.what_container}>
        <Link href="/login#description" className={styles.what_reane}>
          What&apos;s Reane !?
          <span className={styles.what_reane_jp}>REANEとは...</span>
          <span className={styles.what_reane_arrow} />
        </Link>
      </div>
    </div>
  )
}