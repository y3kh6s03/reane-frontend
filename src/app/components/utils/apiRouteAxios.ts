/* eslint-disable import/prefer-default-export */
import axios from "axios"

export const apiRouteAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 3000
})