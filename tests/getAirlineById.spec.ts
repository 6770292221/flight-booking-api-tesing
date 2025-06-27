import { test, request, expect } from "@playwright/test";

test("should return correct airline by ID", async ({ baseURL }) => {
  // เรียก API /airline/:id
  const airlineId = "67fa2f6d208cdb649f55f757";
  const apiContext = await request.newContext({});

  const res = await apiContext.get(
    `${baseURL}/api/v1/airline-core-api/airline/${airlineId}`
  );
  const body = await res.json();

  // Assertion
  expect(res.status()).toBe(200);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1004");
  expect(body.message).toBe("Airports retrieved successfully.");

  const data = body.data;
  expect(data._id).toBe("67fa2f6d208cdb649f55f757");
  expect(data.carrierCode).toBe("TG");
  expect(data.airlineName).toBe("Thai Airways International");
  expect(data.country).toBe("Thailand");
  expect(data.isLowCost).toBe(true);
});
