import React from "react"

import { redirect } from "next/navigation";
import { auth } from "@/../auth"
import LoginForm from "./Form";
import styles from "./styles/Login.module.scss"
import LoginHeader from "./LoginHeader";
import Description from "./Description";
import Issue from "./Issue";
import Features from "./Features";

export default async function LoginIndex() {
  const session = await auth();
  if (session?.user) {
    redirect('/myChart')
  }
  return (
    <div className={styles.container}>
      <LoginHeader />
      <LoginForm />
      <Description />
      <Issue />
      <Features />
    </div>
  )
}