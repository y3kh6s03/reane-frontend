import { auth } from "@/auth";
import CreateIndex from "../features/create/Index";

export default async function Create() {
  const session = await auth();
  const userData = {
    userName: session?.user?.name ?? '',
    userImage: session?.user?.image ?? '',
    userEmail: session?.user?.email ?? '',
  }
  return (
    <CreateIndex userData={userData}/>
  )
}