import { api } from "../api/axios";

export async function fetchCounter() {
  const { data } = await api.get("/counter");
  return data;
}

export async function incrementCounter() {
  const { data } = await api.post("/counter/increment");
  return data;
}
