// import axios from "axios";

import axios from "axios";
import { backendApiAxios } from "../utils";

/* eslint-disable import/prefer-default-export */

export async function GET() {
  const res = await backendApiAxios.get("/chart/all");
  const data = await res.data;
  return Response.json(data);
}

export async function POST(req: Request){
  const reqData = await req.json();
  const URL = `${process.env.LARAVEL_API_BASE_URL}/journal`;
  const res = await axios.post(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}