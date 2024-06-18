/* eslint-disable import/prefer-default-export */

import axios from "axios";

const generateUrl = (id: number) => {
  const encordId = encodeURIComponent(id);
  const URL = `${process.env.LARAVEL_API_BASE_URL}/myChart/reach/${encordId}`;
  return URL;
}

export async function PATCH(req: Request) {
  const reqData = await req.json();
  const URL = generateUrl(reqData.id)
  const res = await axios.patch(URL, reqData);
  const data = await res.data;
  return Response.json(data);
}

export async function DELETE(req: Request) {
  const reqData = await req.json();
  const URL = generateUrl(reqData.id)
  const res = await axios.delete(URL, {data: reqData});
  const data = await res.data;
  return Response.json(data)
}