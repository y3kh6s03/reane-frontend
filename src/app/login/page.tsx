import React from "react"
import IsHowToModalProvider from "@/components/utils/IsHowToModalProvider"
import LoginHeader from "@/features/login/LoginHeader";
import { redirect } from "next/navigation";
import LoginForm from "@/features/login/Form";
import LoginIndex from "../features/login/Index"
import { auth } from "../../auth";

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect('/myChart')
  }
  return (
    <IsHowToModalProvider>
      <LoginHeader />
      <LoginForm />
      <LoginIndex />
    </IsHowToModalProvider>
  )
}