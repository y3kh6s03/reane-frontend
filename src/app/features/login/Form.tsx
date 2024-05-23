import { signIn } from "@/auth";
import Image from "next/image";
import styles from './login.module.scss';

export default function LoginForm() {
  const login = async () => {

    "use server"

    await signIn('google',{ redirectTo: "/myChart" });
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        action={login}>
        <h1 className={styles.name}>
          <span className={styles.subname}>
            Share Mandala Chart
          </span>
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
          <span>GOOGLE</span>
          でログイン
        </button>
      </form>
      <p className={styles.description}>
        利用規約およびプライバシーポリシーに同意の上、ログインへお進みください。
      </p>
    </div>
  )
}