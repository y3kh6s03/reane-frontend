/* eslint-disable import/prefer-default-export */
import axios from "axios"

export const backendApiAxios = axios.create({
  baseURL: process.env.LARAVEL_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 3000
})