import axios from "axios";

/* eslint-disable import/prefer-default-export */
export async function POST(req: Request) {
  const reqData = await req.json();
  const encordReachName = encodeURIComponent(reqData.reachName);
  const encordSkillName = encodeURIComponent(reqData.skillName);
  const encordActionName = encodeURIComponent(reqData.actionId);
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/${encordReachName}/${encordSkillName}/${encordActionName}`;
  const res = await axios.post(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}