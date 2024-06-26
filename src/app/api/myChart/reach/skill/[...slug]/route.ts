/* eslint-disable import/prefer-default-export */
import axios from "axios";


export async function POST(req: Request) {
  const reqData = await req.json();
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/reach/skill/${reqData.editSkillName}`;
  const res = await axios.post(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}

export async function PATCH(req: Request){
  const reqData = await req.json();
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/reach/skill/${reqData.editSkillName}`;
  const res = await axios.patch(URL,reqData);
  const data = await res.data;
  return Response.json(data);
}

export async function DELETE(req: Request) {
  const reqData = await req.json();
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/reach/skill/${reqData.editSkillName}`;
  const res = await axios.delete(URL, { data: reqData });
  const data = await res.data;
  return Response.json(data);
}