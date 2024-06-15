/* eslint-disable import/prefer-default-export */

import axios from "axios";

export async function PATCH(req: Request) {
  const reqData = await req.json();
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/reach/${reqData.id}`;
  const res = await axios.patch(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}