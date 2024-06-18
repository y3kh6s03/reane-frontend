"use client"

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Delete } from "@/components/elements/icons/Icons";
import styles from "./styles/Reach.module.scss";
import { JournalButton } from "../../components/elements/button/Button";
import AuthDetail from "../../components/elements/authDetail/AuthDetail";
import { ReachData, handleReachDeleteSubmit, handleReachNameSubmit } from "./handlers/ReachHandler";
import { useAppDispatch } from "../../../store/hooks";



export default function Reach({ id, name, userEmail, userName, userImage }: ReachData) {

  const { data: session } = useSession();
  const [reachName, setReachName] = useState<string>(name || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const authName = session?.user?.name
  const userData = {
    userName,
    userImage
  }

  useEffect(() => {
    if (name) {
      setReachName(name);
    }
  }, [name])

  const formRef = useRef<HTMLFormElement>(null);
  const handleReachNameOnBlur = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  }

  const reachData = {
    id, name, userEmail, userName, userImage
  }

  return (
    <div className={styles.container}>
      <div className={styles.reach}>
        {
          userName === authName && id && userEmail
            ?
            <form
              className={styles.reach_title}
              ref={formRef}
              onSubmit={(e) => handleReachNameSubmit({ e, reachData, setReachName, setErrorMsg })}
            >
              <label
                className={styles.reach_label}
                htmlFor="reachNameName">
                REACH
              </label>
              <input
                id="reachNameName"
                type="text"
                name="reachName"
                defaultValue={reachName || ''}
                onBlur={() => { handleReachNameOnBlur() }}
              />
              {
                errorMsg !== null
                &&
                <span
                  style={{ color: 'red' }}
                >
                  {errorMsg}
                </span>
              }
              <div className={styles.delete_container}>
                <Delete deleteHandler={() => { handleReachDeleteSubmit({ id, userEmail, dispatch, setErrorMsg }) }} />
              </div>

            </form>
            :
            <div className={styles.reach_title}>
              <h1 className={styles.reach_name}>
                REACH
                <span>
                  {name}
                </span>
              </h1>
            </div>
        }
      </div>
      {

        userName === authName
          ?
          <JournalButton journal={name !== undefined ? name : ''} />
          :
          <div className={styles.authDetail_container}>
            <AuthDetail userData={userData} />
          </div>
      }
    </div>
  )
}