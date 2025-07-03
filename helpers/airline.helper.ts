import { request } from "@playwright/test";

const baseURL = process.env.BASE_URL!;
const endpoint = "/api/v1/airline-core-api/airline";

function createContext(token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return request.newContext({ extraHTTPHeaders: headers });
}

export async function getAllAirlines(token?: string) {
  const apiContext = await createContext(token);
  const res = await apiContext.get(`${baseURL}${endpoint}s`);
  const body = await res.json();
  return { res, body };
}

export async function postAirline(payload: any, token?: string) {
  const apiContext = await createContext(token);
  const res = await apiContext.post(`${baseURL}${endpoint}`, {
    data: payload,
  });
  const body = await res.json();
  return { res, body };
}

export async function deleteAirlineById(id: string, token?: string) {
  const apiContext = await createContext(token);
  const res = await apiContext.delete(`${baseURL}${endpoint}/${id}`);
  const body = await res.json();
  return { res, body };
}

export async function patchAirlineById(
  id: string,
  updatePayload: any,
  token?: string
) {
  const apiContext = await createContext(token);
  const res = await apiContext.patch(`${baseURL}${endpoint}/${id}`, {
    data: updatePayload,
  });
  const body = await res.json();
  return { res, body };
}

export async function getAirlineById(id: string, token?: string) {
  const apiContext = await createContext(token);
  const res = await apiContext.get(`${baseURL}${endpoint}/${id}`);
  const body = await res.json();
  return { res, body };
}
