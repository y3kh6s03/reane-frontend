"use client"

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AddAction, addReach, initCreateChart } from "@/store/slice/CreateChartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthDetail from "../../components/elements/authDetail/AuthDetail";

import styles from "./Create.module.scss";
import { CreateAndCancelButton, ModalToggleButton } from "../../components/elements/button/Button";
import SkillInputModal from "../../components/elements/Modal/SkillInputModal";
import Chart from "../../components/elements/chart/Chart";
import SkillInputModalContainer from "../../components/utils/SkillInputModalContainer";
import ActionInputModalContainer from "../../components/utils/ActionInputModalContainer";
import ActionInputModal from "../../components/elements/Modal/ActionInputModal";


interface UserData {
  userData: {
    userName: string,
    userImage: string,
    userEmail: string,
  }
}

export default function CreateIndex({ userData }: UserData) {

  const createChartStates = useAppSelector((state) => state.createChart)
  const dispatch = useAppDispatch();
  const [isSkillModal, setIsSkillModal] = useState(false);
  const [isActionModal, setIsActionModal] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [reachName, setReachName] = useState('');
  const [addModalActions, setAddModalActions] = useState<AddAction[]>([]);
  const [inputAction, setInputAction] = useState<string>('');
  const router = useRouter();

  const chartData = {
    userName: userData.userName,
    userImage: userData.userImage,
    skills: createChartStates.skills,
    setIsActionModal,
    setSkillName,
  };

  const actionData = {
    setIsActionModal,
    skillName,
    addModalActions,
    setAddModalActions,
    inputAction,
    setInputAction,
    addedActions: createChartStates.skills
  }

  const modalToggleProps = {
    setIsModal: setIsSkillModal,
    toggleName: 'スキル'
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
    await axios.post('http://localhost:3000/api/myChart/create', createChartStates)
    dispatch(initCreateChart())
    setReachName('');
    router.push('/myChart');
  }

  return (
    <div className={styles.container} id="create">

      <h1 className={styles.title}>New Create</h1>

      <div className={styles.authDetail_container}>
        <AuthDetail userData={userData} />
      </div>

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
        <div className={styles.modalbutton_container}>
          <ModalToggleButton modalToggleProps={modalToggleProps} />
          <CreateAndCancelButton createAndCancelProps={{ buttonName: 'CREATE', handler: createHandler }} />
        </div>
        <Chart skillDatas={chartData} />
      </div>

      {isSkillModal &&
        <SkillInputModalContainer>
          <SkillInputModal setIsSkillModal={setIsSkillModal} />
        </SkillInputModalContainer>
      }

      {isActionModal &&
        <ActionInputModalContainer>
          <ActionInputModal actionData={actionData}
          />
        </ActionInputModalContainer>
      }

    </div>
  )
}