import { signOut } from '@/auth';
import styles from "./logout.module.scss"


export default function Logout() {

  const logout = async () => {
    "use server"

    await signOut();
  }
  return (
    <form
      className={styles.form}
      action={logout}>
      <button
        className={styles.form_button}
        type='submit'>
        Logout
      </button>
    </form>
  )
}