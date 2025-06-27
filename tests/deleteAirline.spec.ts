import { test, request, expect, APIRequestContext } from "@playwright/test";
import { loginAndGetToken } from "../helpers/auth.helper";

let apiContext: APIRequestContext;
let createdAirlineId: string;

test.beforeEach(async ({ baseURL }) => {
  // 1. Login และสร้าง context พร้อม token
  const token = await loginAndGetToken();

  apiContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // 2. สร้าง airline ชั่วคราว
  const newAirline = {
    carrierCode: "ANA" + Date.now(),
    airlineName: "All Nippon Airways " + Date.now(),
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/52/All_Nippon_Airways_logo.svg",
    country: "Japan",
    isLowCost: false,
  };

  const res = await apiContext.post(
    `${baseURL}/api/v1/airline-core-api/airline`,
    {
      data: newAirline,
    }
  );

  const body = await res.json();
  expect(res.status()).toBe(201);
  createdAirlineId = body.data._id;
});

test("DELETE /airline should delete the created airline", async ({
  baseURL,
}) => {
  // เรียก DELETE อีกครั้งเพื่อตรวจการลบด้วยตัวเอง
  const res = await apiContext.delete(
    `${baseURL}/api/v1/airline-core-api/airline/${createdAirlineId}`
  );

  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1007");
  expect(body.message).toBe("Airport created successfully");
});
