import { test, request, expect } from "@playwright/test";
import { getAllAirlines } from "../helpers/airline.helper";

test("GET /airlines returns correct airline", async () => {
  const { res, body } = await getAllAirlines();

  // ตรวจ response
  expect(res.status()).toBe(200);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1004");
  expect(body.message).toBe("Airports retrieved successfully.");

  // ตรวจ array
  expect(Array.isArray(body.data.items)).toBe(true);
  expect(body.data.items.length).toBeGreaterThanOrEqual(5);

  // ตรวจ items[0]
  // ตรวจ items[0]
  const first = body.data.items[0];
  expect(first).toHaveProperty("_id");
  expect(first.carrierCode).toBe("VZ");
  expect(first.airlineName).toBe("VietJet Air");
  expect(first.logoUrl).toMatch(
    /^https:\/\/(raw\.githubusercontent\.com|upload\.wikimedia\.org)/
  );
  expect(first.country).toBe("Thailand");
  expect(first.isLowCost).toBe(true);
  expect(first).toHaveProperty("createdAt");
  expect(first).toHaveProperty("updatedAt");
});
