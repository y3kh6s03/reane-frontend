/* eslint-disable import/prefer-default-export */

import axios from "axios";

export async function POST(req: Request) {
  const reqData = await req.json();
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/${reqData.editSkillName}`
  const res = await axios.post(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}