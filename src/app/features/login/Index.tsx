import React from "react"

import { redirect } from "next/navigation";
import { auth } from "@/auth"
import LoginForm from "./Form";

export default async function LoginIndex() {
  const session = await auth();
  if (session?.user) {
    redirect('/myChart')
  }
  return (
    <LoginForm />
  )
}