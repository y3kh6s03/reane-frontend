import axios from "axios";

interface ActionNameProps {
  reachName: string,
  skillName: string,
  actionName: string,
  actionId: number,
}

const encodeFactory = (encordProps: ActionNameProps) => {
  const encordReachName = encodeURIComponent(encordProps.reachName);
  const encordSkillName = encodeURIComponent(encordProps.skillName);
  const encordActionName = encodeURIComponent(encordProps.actionId);
  return { encordReachName, encordSkillName, encordActionName };
}

/* eslint-disable import/prefer-default-export */
export async function POST(req: Request) {
  const reqData: ActionNameProps = await req.json();
  const { encordReachName, encordSkillName, encordActionName } = encodeFactory(reqData);
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/${encordReachName}/${encordSkillName}/${encordActionName}`;
  const res = await axios.post(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}

export async function DELETE(req: Request) {
  const reqData: ActionNameProps = await req.json();
  const { encordReachName, encordSkillName, encordActionName } = encodeFactory(reqData);
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/${encordReachName}/${encordSkillName}/${encordActionName}`;
  const res = await axios.delete(URL, {
    data: {
      actionId: reqData.actionId
    }
  });
  const data = await res.data;
  return Response.json(data);
}