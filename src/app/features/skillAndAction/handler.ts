/* eslint-disable import/prefer-default-export */

import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


interface DeleteHandlerProps {
  skillName: string,
  reachName: string,
  userEmail: string,
  router: AppRouterInstance
}

export const deleteHandler = async ({ reachName, skillName, userEmail, router }: DeleteHandlerProps) => {
  const result = confirm('スキルを削除しますか？\nスキルに登録されたアクションも一緒に削除されます。')
  if (result) {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/myChart/${skillName}`;
    const deleteData = {
      reachName,
      skillName,
      userEmail
    }
    const res = await axios.delete(URL, {
      data: deleteData
    })
    if (res.status === 200) {
      router.push('/myChart');
    }
  }
}