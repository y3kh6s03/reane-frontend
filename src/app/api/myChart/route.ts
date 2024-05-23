/* eslint-disable import/prefer-default-export */

import axios from "axios";

const MYCHART_API_URL = `${process.env.LARAVEL_API_BASE_URL}/myChart`

export async function POST(req: Request) {
  const reqData = await req.json();
  const res = await axios.post(MYCHART_API_URL, reqData);
  const data = await res.data;
  return Response.json(data);
}