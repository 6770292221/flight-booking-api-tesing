import { test, request, expect } from "@playwright/test";

test("GET /airlines returns correct airline", async ({ baseURL }) => {
  // เรียก /airlines พร้อมใส่ token
  const apiContext = await request.newContext({});

  const res = await apiContext.get(
    `${baseURL}/api/v1/airline-core-api/airlines`
  );
  const body = await res.json();

  // ตรวจ response
  expect(res.status()).toBe(200);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1004");
  expect(body.message).toBe("Airports retrieved successfully.");

  // ตรวจ array
  expect(Array.isArray(body.data.items)).toBe(true);
  expect(body.data.items.length).toBeGreaterThanOrEqual(6);

  // ตรวจ items[0]
  const first = body.data.items[0];
  expect(first).toHaveProperty("_id");
  expect(first.carrierCode).toBe("SL");
  expect(first.airlineName).toBe("Thai Lion Air");
  expect(first.logoUrl).toMatch(/^https:\/\/raw\.githubusercontent\.com/);
  expect(first.country).toBe("Thailand");
  expect(first.isLowCost).toBe(true);
  expect(first).toHaveProperty("createdAt");
  expect(first).toHaveProperty("updatedAt");
});
