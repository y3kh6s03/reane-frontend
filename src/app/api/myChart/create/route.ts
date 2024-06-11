// import { ChartData } from "@/store/AuthChartsSlice";
import axios from "axios"

const CREATE_API_URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/create` ?? '';

/* eslint-disable import/prefer-default-export */
export async function POST(req: Request) {
  const reqData = await req.json();
  const res = await axios.post(CREATE_API_URL, reqData);
  const data = await res.data;
  return Response.json(data);
}