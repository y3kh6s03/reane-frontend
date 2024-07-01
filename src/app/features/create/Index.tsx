"use client"

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/../store/hooks";
import { AddAction, addReach, addSkill, initCreateChart } from "@/../store/slice/CreateChartSlice";
import ModalContainer from "@/components/utils/ModalContainer";
import { useIsRegisterSkillModal } from "@/components/utils/IsRegisterSkillModailProvider";

import styles from "./Create.module.scss";
import { CreateAndCancelButton, ModalToggleButton } from "../../components/elements/button/Button";
import RegisterSkillModal from "../../components/elements/Modal/RegisterSkillModal";
import Chart from "../../components/elements/chart/Chart";
import ActionInputModal from "../../components/elements/Modal/ActionInputModal";


interface UserData {
  userData: {
    userName: string,
    userImage: string,
    userEmail: string,
  }
}

interface AddChartPayload {
  skillName: string;
}

export default function CreateIndex({ userData }: UserData) {

  const { isRegisterSkillModal, setIsRegisterSkillModal } = useIsRegisterSkillModal();
  const createChartStates = useAppSelector((state) => state.createChart)
  const dispatch = useAppDispatch();
  const [isActionModal, setIsActionModal] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [reachName, setReachName] = useState('');
  const [addModalActions, setAddModalActions] = useState<AddAction[]>([]);
  const [inputAction, setInputAction] = useState<string>('');
  const [editSkillName, setEditSkillName] = useState<string>('');
  const [editActionNames, setEditActionNames] = useState<string[]>([]);
  const router = useRouter();

  const chartData = {
    userName: userData.userName,
    userImage: userData.userImage,
    userEmail: userData.userEmail,
    reachName,
    skills: createChartStates.skills,
    setIsActionModal,
    setSkillName,
  };

  const actionData = {
    setIsActionModal,
    skillName,
    setSkillName,
    addModalActions,
    setAddModalActions,
    inputAction,
    setInputAction,
    addedActions: createChartStates.skills,
    editSkillName,
    setEditSkillName,
    editActionNames,
    setEditActionNames,
  }

  const reachNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReachName(e.target.value)
  }

  const reachNameDispatch = () => {
    const reachPaylord = {
      userName: userData.userName,
      userImage: userData.userImage,
      userEmail: userData.userEmail,
      reachName
    }
    dispatch(addReach({ reachPaylord }))
  }

  const createHandler = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/create`, createChartStates)
    dispatch(initCreateChart())
    setReachName('');
    router.push('/myChart');
  }

  const handleRegisterSkillModalSubmit = (inputSkillName: string) => {
    const payload: AddChartPayload = { skillName: inputSkillName };
    dispatch(addSkill(payload));
  }

  return (
    <div className={styles.container} id="create">
      <h1 className={styles.title}>New Create</h1>

      <label className={styles.reachInput_label} htmlFor="reachName">
        REACH
        <input
          className={styles.reachInput_input}
          name="reach_name"
          type="text"
          placeholder="目標を入力してください"
          value={reachName}
          onChange={(e) => { reachNameHandler(e) }}
          onBlur={reachNameDispatch}
        />

      </label>
      <div className={styles.chart_container}>
        <Chart skillDatas={chartData} />
        <div className={styles.modalbutton_container}>
          <ModalToggleButton {...{
            setIsModal: setIsRegisterSkillModal,
            toggleName: 'スキル'
          }} />
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'CREATE', handler: createHandler }} />
        </div>
      </div>

      {
        isRegisterSkillModal &&
        <ModalContainer targetName='create'>
          <RegisterSkillModal handleSubmit={handleRegisterSkillModalSubmit} />
        </ModalContainer>
      }

      {
        isActionModal &&
        <ModalContainer targetName='create'>
          <ActionInputModal actionData={actionData}
          />
        </ModalContainer>
      }
    </div>

  )
}