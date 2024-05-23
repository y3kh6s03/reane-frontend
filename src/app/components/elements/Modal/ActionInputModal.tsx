import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useAppDispatch } from "@/store/hooks";
import { AddAction, addActions } from "@/store/slice/CreateChartSlice";
import { SkillData } from "@/store/slice/AuthChartsSlice";
import styles from "./styles/ActionInput.module.scss"
import { CreateAndCancelButton } from "../button/Button";

interface ActionInputProps {
  actionData: {
    setIsActionModal: Dispatch<SetStateAction<boolean>>,
    skillName: string
    addModalActions: AddAction[],
    setAddModalActions: Dispatch<SetStateAction<AddAction[]>>,
    inputAction: string,
    setInputAction: Dispatch<SetStateAction<string>>,
    addedActions?: SkillData
  }
};

export default function ActionInputModal({ actionData }: ActionInputProps) {

  const dispatch = useAppDispatch();

  const addActionsHandler = () => {
    dispatch(addActions({ skillName: actionData.skillName, actionDatas: actionData.addModalActions }))
    actionData.setAddModalActions([])
    actionData.setIsActionModal((prev) => !prev);
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    actionData.setInputAction(e.target.value);
  }

  const onBlurHandler = () => {
    if (actionData.inputAction !== '') {
      const addAction = { id: new Date().getTime(), name: actionData.inputAction }
      actionData.setAddModalActions((prev: AddAction[]) => [...prev, addAction])
      actionData.setInputAction('');
    }
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onBlurHandler();
  }

  const cancelHandler = ()=>{
    actionData.setIsActionModal((prev) => !prev);
    actionData.setAddModalActions([]);
  }

  const handleInputEdit = (name: string, id: number) => {
    actionData.setAddModalActions((prevActions) => {
      const newAddActions = prevActions.map((action) => {
        if (action.id === id) {
          // eslint-disable-next-line no-param-reassign
          action.name = name;
        }
        return action
      })
      return newAddActions;
    })
  }

  const addedActionDatas = actionData.addedActions;

  const actions = addedActionDatas && addedActionDatas[actionData.skillName]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.modal_title}>
          ACTION追加
        </h2>

        <h3 className={styles.skill}>
          SKILL
          <span className={styles.skill_name}>
            {actionData.skillName}
          </span>
        </h3>

        <div className={styles.action_container}>
          <h3 className={styles.action}>
            ACTION
          </h3>
          <ul className={styles.action_name_container}>
            {
              actions
                ?
                actions.map((action) =>
                  <li key={Object.keys(action)[0]} className={styles.action_name}>
                    {Object.keys(action)[0]}
                  </li>
                )
                :
                ''
            }
          </ul>
        </div>


        <h3 className={styles.addAction}>
          ADD ACTION
          <form onSubmit={(e) => { onSubmitHandler(e) }}>
            <input
              type="text"
              className={styles.action_input}
              placeholder="actionを追加"
              value={actionData.inputAction}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </form>
          <ul className={styles.addAction_container}>
            {
              actionData.addModalActions.map((action) =>
                <li key={action.id}>
                  <input
                    className={styles.addAction_name}
                    value={action.name}
                    onChange={(e) => { handleInputEdit(e.target.value, action.id) }}
                  />
                </li>
              )
            }
          </ul>
        </h3>

        <div className={styles.button_container}>
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'CANCEL', handler: cancelHandler }} />
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'SAVE', handler: addActionsHandler }} />
        </div>
      </div>
    </div >
  )
}