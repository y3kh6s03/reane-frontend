import { useEffect } from 'react';
import { useAppDispatch } from '@/../store/hooks';
import { addActions, deleteSkillName, editActionName } from '@/../store/slice/CreateChartSlice';
import styles from './styles/ActionInput.module.scss';
import { CreateAndCancelButton } from '../button/Button';
import { Delete } from '../icons/Icons';
import { addActionDeleteHandler, editActionDeleteHandler, editSkillNameHandler, handleInputEdit, onBlurEditSkillNameHandler, onBlurHandler, onChangeHandler, onSubmitHandler } from './handlers/ActionInputHandler';
import { ActionInputProps } from './types';

export default function ActionInputModal({ actionData }: ActionInputProps) {

  useEffect(() => {
    actionData.setEditSkillName(actionData.skillName);
    if (actionData.addedActions) {
      actionData.setEditActionNames([]);
      actionData.addedActions[actionData.skillName].actions.map((val) =>
        actionData.setEditActionNames((prev) =>
          [...prev, Object.keys(val)[0]]
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useAppDispatch();

  const addActionsHandler = () => {
    dispatch(addActions({ skillName: actionData.editSkillName, actionDatas: actionData.addModalActions }))
    actionData.setAddModalActions([])
    actionData.setIsActionModal((prev) => !prev);
    actionData.setEditActionNames([]);
  }

  const cancelHandler = () => {
    actionData.setIsActionModal((prev) => !prev);
    actionData.setAddModalActions([]);
  }

  const deleteSkillNameHandler = () => {
    const result = confirm('スキルに登録したアクションもすべて削除されます。\nこのスキルを削除してもいいですか？');
    if (result) {
      dispatch(deleteSkillName({ skillName: actionData.editSkillName }))
      cancelHandler();
    }
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
          <div className={styles.skill_name_inner}>
            <input
              className={styles.skill_name}
              value={actionData.editSkillName}
              onChange={(e) => { editSkillNameHandler(e, actionData.setEditSkillName) }}
              onBlur={() => { onBlurEditSkillNameHandler(actionData.skillName, dispatch, actionData.editSkillName) }}
            />
            <div className={styles.deleteIcon_container}>
              <Delete deleteHandler={() => deleteSkillNameHandler()} />
            </div>
          </div>
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
                      onBlur={() => dispatch(editActionName({ skillName: actionData.editSkillName, index, newActionName: actionName }))}
                    />
                    <div className={styles.deleteIcon_container}>
                      <Delete deleteHandler={() => { editActionDeleteHandler(index, actionData.editActionNames, actionData.setEditActionNames, dispatch, actionData.skillName) }} />
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
          <form onSubmit={(e) => { onSubmitHandler(e, actionData.inputAction, actionData.setAddModalActions, actionData.setInputAction) }}>
            <input
              type='text'
              className={styles.addAction_input}
              placeholder='actionを追加'
              value={actionData.inputAction}
              onChange={(e) => onChangeHandler(e, actionData.setInputAction)}
              onBlur={() => onBlurHandler(actionData.inputAction, actionData.setAddModalActions, actionData.setInputAction)}
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
                    onChange={(e) => { handleInputEdit(actionData.setAddModalActions, e.target.value, action.id) }}
                  />
                  <div className={styles.deleteIcon_container}>
                    <Delete deleteHandler={() => {
                      addActionDeleteHandler(index, actionData.addModalActions, actionData.setAddModalActions)
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