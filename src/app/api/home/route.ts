/* eslint-disable import/prefer-default-export */

import { NextRequest } from "next/server";
import { backendApiAxios } from "../utils";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const pageNumber = searchParams.get("page")
  const res = await backendApiAxios.get(`/chart/all?page=${pageNumber}`);
  const data = await res.data;
  return Response.json(data);
}