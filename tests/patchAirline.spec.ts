import { test, request, expect } from "@playwright/test";
import { loginAndGetToken } from "../helpers/auth.helper";

test("PATCH /airline updates airline fields correctly", async ({ baseURL }) => {
  const token = await loginAndGetToken(); // สมมติว่าคุณมี helper นี้แล้ว

  const api = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const updatedData = {
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Thai_Lion_Air_logo.svg",
    isLowCost: true,
  };

  const res = await api.patch(
    `${baseURL}/api/v1/airline-core-api/airline/67df871a4226b11375cd3961`,
    {
      data: updatedData,
    }
  );

  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1006");
  expect(body.data.logoUrl).toBe(updatedData.logoUrl);
  expect(body.data.isLowCost).toBe(updatedData.isLowCost);
});
