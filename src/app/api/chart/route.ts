import { backendApiAxios } from "../utils";

export async function GET() {
  const res = await backendApiAxios.get("/chart/all");
  const data = await res.data;
  return Response.json(data);
}