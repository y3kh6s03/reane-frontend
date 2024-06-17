import axios from "axios";

interface ActionNameProps {
  userEmail: string,
  reachName: string,
  skillName: string,
  actionName: string,
  actionId: number,
}

interface ActionNamePatchProps {
  isCompleted: boolean,
  actionId: number
}

/* eslint-disable import/prefer-default-export */
export async function POST(req: Request) {
  const reqData: ActionNameProps = await req.json();
  const encodeActionId = encodeURIComponent(reqData.actionId);
  const URL =`${process.env.LARAVEL_API_BASE_URL}/myChart/reach/skill/action/${encodeActionId}`;
  const res = await axios.post(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}

export async function PUT(req: Request) {
  const reqData: ActionNameProps = await req.json();
  const encodeActionId = encodeURIComponent(reqData.actionId);
  const URL =`${process.env.LARAVEL_API_BASE_URL}/myChart/reach/skill/action/${encodeActionId}`;
  const res = await axios.put(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}

export async function PATCH(req: Request) {
  const reqData: ActionNamePatchProps = await req.json();
  const encodeActionId = encodeURIComponent(reqData.actionId);
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/reach/skill/action/${encodeActionId}`;
  const res = await axios.patch(URL,reqData);
  const data = await res.data;
  return Response.json(data);
}

export async function DELETE(req: Request) {
  const reqData: ActionNameProps = await req.json();
  const encodeActionId = encodeURIComponent(reqData.actionId);
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/reach/skill/action/${encodeActionId}`;
  const res = await axios.delete(URL, {
    data: {
      actionId: reqData.actionId
    }
  });
  const data = await res.data;
  return Response.json(data);
}