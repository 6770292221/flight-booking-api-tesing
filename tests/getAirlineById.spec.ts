import { test, request, expect } from "@playwright/test";
import { getAirlineById } from "../helpers/airline.helper";

test("should return correct airline by ID", async () => {
  const airlineId = "67fa2f6d208cdb649f55f757";

  // เรียก helper โดยส่ง context + id
  const { res, body } = await getAirlineById(airlineId);

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
