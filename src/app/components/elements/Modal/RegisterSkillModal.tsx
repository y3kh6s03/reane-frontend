import { useIsRegisterSkillModal } from "@/components/utils/IsRegisterSkillModailProvider";
import styles from "./styles/SkillInput.module.scss";

interface RegisterSkillModalProps {
  handleSubmit: (skillName: string) => void,
}

export default function RegisterSkillModal({ handleSubmit }: RegisterSkillModalProps) {

  const { setIsRegisterSkillModal } = useIsRegisterSkillModal();

  const cancelHandler = () => {
    setIsRegisterSkillModal(prev => !prev)
  }

  const handleSkillNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const inputSkillName = form.get('skillName');
    if (inputSkillName && typeof inputSkillName === 'string' && inputSkillName !== '') {
      handleSubmit(inputSkillName);
    }
    cancelHandler();
  }

  return (
    <div
      className={styles.skillModal_wrapper}>
      <form className={styles.skillModal} onSubmit={(e) => { handleSkillNameSubmit(e) }}>
        <input
          className={styles.skillModal_input}
          type="text"
          name="skillName"
          placeholder='スキルを追加'
          defaultValue=''
        />
        <div className={styles.button_container}>
          <button
            className={styles.skillModal_cancel}
            type="button"
            onClick={cancelHandler}
          >
            CANCEL
          </button>
          <button
            className={styles.skillModal_ok}
            type="submit"
          >
            OK
          </button>
        </div>
      </form>
    </div>
  )
}