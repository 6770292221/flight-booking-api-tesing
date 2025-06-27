import { test, request, expect } from "@playwright/test";
import { loginAndGetToken } from "../helpers/auth.helper";
import { patchAirlineById } from "../helpers/airline.helper";

let createdAirlineId: string | null = null;
let token: string;

test.beforeAll(async () => {
  token = await loginAndGetToken();
});

test("PATCH /airline updates airline fields correctly", async ({ baseURL }) => {
  const airlineId = "67df871a4226b11375cd3960";
  const updatedData = {
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Thai_Lion_Air_logo.svg",
    isLowCost: true,
  };

  const { res, body } = await patchAirlineById(airlineId, updatedData, token);

  expect(res.status()).toBe(200);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1006");
  expect(body.data.logoUrl).toBe(updatedData.logoUrl);
  expect(body.data.isLowCost).toBe(updatedData.isLowCost);
});
