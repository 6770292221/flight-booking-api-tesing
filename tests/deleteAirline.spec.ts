import { test, request, expect } from "@playwright/test";
import { loginAndGetToken } from "../helpers/auth.helper";
import { deleteAirlineById, postAirline } from "../helpers/airline.helper";

let createdAirlineId: string;
let token: string;

test.beforeEach(async () => {
  // 1. Login
  token = await loginAndGetToken();

  // 2. เตรียม Airline
  const newAirline = {
    carrierCode: "ANA" + Date.now(),
    airlineName: "All Nippon Airways " + Date.now(),
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/52/All_Nippon_Airways_logo.svg",
    country: "Japan",
    isLowCost: false,
  };

  // 3. Post airline ด้วย helper
  const { res, body } = await postAirline(newAirline, token);

  expect(res.status()).toBe(201);
  createdAirlineId = body.data._id;
});

test("DELETE /airline should delete the created airline", async () => {
  const { res, body } = await deleteAirlineById(createdAirlineId, token);

  expect(res.status()).toBe(200);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1007");
  expect(body.message).toBe("Airport created successfully");
});
