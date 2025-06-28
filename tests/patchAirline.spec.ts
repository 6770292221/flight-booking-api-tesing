import { test, request, expect } from "@playwright/test";
import { loginAndGetToken } from "../helpers/auth.helper";
import { patchAirlineById } from "../helpers/airline.helper";
import {
  expectStatus,
  expectValues,
  expectObjectFieldValues,
} from "../helpers/assert.helper";

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

  // ตรวจ response status และโครงสร้าง
  await expectStatus(res, 200);
  expectValues(body, {
    status: "success",
    code: "AIR_1006",
  });

  // ตรวจค่าที่เปลี่ยน
  expectObjectFieldValues(body.data, {
    logoUrl: updatedData.logoUrl,
    isLowCost: updatedData.isLowCost,
  });
});
