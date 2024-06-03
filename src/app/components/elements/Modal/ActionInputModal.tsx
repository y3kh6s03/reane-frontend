import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect } from 'react';
import { useAppDispatch } from '@/../store/hooks';
import { AddAction, addActions, deleteActionName, editActionName } from '@/../store/slice/CreateChartSlice';
import { SkillData } from '@/../store/slice/AuthChartsSlice';
import styles from './styles/ActionInput.module.scss';
import { CreateAndCancelButton } from '../button/Button';
import { Delete } from '../icons/Icons';

interface ActionInputProps {
  actionData: {
    setIsActionModal: Dispatch<SetStateAction<boolean>>,
    skillName: string,
    setSkillName: Dispatch<SetStateAction<string>>
    addModalActions: AddAction[],
    setAddModalActions: Dispatch<SetStateAction<AddAction[]>>,
    inputAction: string,
    setInputAction: Dispatch<SetStateAction<string>>,
    addedActions?: SkillData,
    editActionNames: string[],
    setEditActionNames: Dispatch<SetStateAction<string[]>>,
  }
};

export default function ActionInputModal({ actionData }: ActionInputProps) {

  useEffect(() => {
    if (actionData.addedActions) {
      actionData.setEditActionNames([]);
      actionData.addedActions[actionData.skillName].map((val) =>
        actionData.setEditActionNames((prev) =>
          [...prev, Object.keys(val)[0]]
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useAppDispatch();

  const addActionsHandler = () => {
    dispatch(addActions({ skillName: actionData.skillName, actionDatas: actionData.addModalActions }))
    actionData.setAddModalActions([])
    actionData.setIsActionModal((prev) => !prev);
    actionData.setEditActionNames([]);
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    actionData.setInputAction(e.target.value);
  }

  const onBlurHandler = () => {
    if (actionData.inputAction !== '') {
      const addAction = { id: new Date().getTime(), name: actionData.inputAction }
      actionData.setAddModalActions((prev: AddAction[]) => [...prev, addAction]);
      actionData.setInputAction('');
    }
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onBlurHandler();
  }

  const cancelHandler = () => {
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
        return action;
      })
      return newAddActions;
    })
  }

  const editSkillNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    actionData.setSkillName(e.target.value)
  }

  const editActionDeleteHandler = (index: number) => {
    const newEditActionNames = [...actionData.editActionNames];
    newEditActionNames.splice(index, 1);
    actionData.setEditActionNames(newEditActionNames);
    dispatch(deleteActionName({ skillName: actionData.skillName, index }))
  }

  const addActionDeleteHandler = (index: number) => {
    const newAddModalActions = [...actionData.addModalActions];
    newAddModalActions.splice(index, 1);
    actionData.setAddModalActions(newAddModalActions);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.modal_title}>
          ACTION追加
        </h2>
        <div className={styles.skill_name_container}>
          <h3 className={styles.skill_title}>
            SKILL
          </h3>
          <input
            className={styles.skill_name}
            value={actionData.skillName}
            onChange={(e) => { editSkillNameHandler(e) }}
            onBlur={() => {alert('skillnameを変えちゃうぞーーー')}}
          />
        </div>

        <div className={styles.action_name_container}>
          <h3 className={styles.action_title}>
            ACTION
          </h3>
          <ul className={styles.action_name_inner}>
            {
              actionData.editActionNames
                ?
                actionData.editActionNames.map((actionName, index) =>
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} className={styles.action_name}>
                    <input
                      type='text'
                      value={actionName}
                      onChange={(e) => {
                        const newEditActionNames = [...actionData.editActionNames];
                        newEditActionNames[index] = e.target.value;
                        actionData.setEditActionNames(newEditActionNames);
                      }}
                      onBlur={() => dispatch(editActionName({ skillName: actionData.skillName, index, newActionName: actionName }))}
                    />
                    <div className={styles.deleteIcon_container}>
                      <Delete deleteHandler={() => { editActionDeleteHandler(index) }} />
                    </div>
                  </li>
                )
                :
                ''
            }
          </ul>
        </div>

        <div className={styles.addAction_name_container}>
          <h3 className={styles.addAction_title}>
            ADD ACTION
          </h3>
          <form onSubmit={(e) => { onSubmitHandler(e) }}>
            <input
              type='text'
              className={styles.addAction_input}
              placeholder='actionを追加'
              value={actionData.inputAction}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </form>
          <ul className={styles.addAction_name_inner}>
            {
              actionData.addModalActions.map((action, index) =>
                <li
                  key={action.id}
                  className={styles.addAction_name}
                >
                  <input
                    value={action.name}
                    onChange={(e) => { handleInputEdit(e.target.value, action.id) }}
                  />
                  <div className={styles.deleteIcon_container}>
                    <Delete deleteHandler={() => {
                      addActionDeleteHandler(index)
                    }} />
                  </div>
                </li>
              )
            }
          </ul>
        </div>

        <div className={styles.button_container}>
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'CANCEL', handler: cancelHandler }} />
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'SAVE', handler: addActionsHandler }} />
        </div>
      </div>
    </div >
  )
}