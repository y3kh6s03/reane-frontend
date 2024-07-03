/* eslint-disable import/prefer-default-export */
import { backendApiAxios } from "../utils";

export async function GET() {
  const res = await backendApiAxios.get("/chart/all");
  const data = await res.data;
  return Response.json(data);
}

export async function POST(req: Request) {
  const reqData = await req.json();
  const res = await backendApiAxios.post("/myChart", reqData);
  const data = await res.data;
  return Response.json(data);
}