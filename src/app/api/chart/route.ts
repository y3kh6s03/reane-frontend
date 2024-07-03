import { backendApiAxios } from "@/api/utils";

/* eslint-disable import/prefer-default-export */
export async function GET() {
  const res = await backendApiAxios.get("/chart/all");
  const data = await res.data;
  return Response.json(data);
}