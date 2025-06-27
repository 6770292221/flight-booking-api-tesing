import { test, expect } from "@playwright/test";
import { loginAndGetToken } from "../helpers/auth.helper";
import { postAirline, deleteAirlineById } from "../helpers/airline.helper";

let createdAirlineId: string | null = null;
let token: string;

test.beforeAll(async () => {
  token = await loginAndGetToken();
});

test("POST /airline should create a new airline with correct values", async () => {
  const newAirline = {
    carrierCode: "JL",
    airlineName: "Japan Airlines",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/84/Japan_Airlines_logo.svg",
    country: "Japan",
    isLowCost: false,
  };

  const { res, body } = await postAirline(newAirline, token);

  expect(res.status()).toBe(201);
  expect(body.status).toBe("success");
  expect(body.code).toBe("AIR_1001");
  expect(body.message).toBe("Airline created successfully.");

  const data = body.data;
  expect(data.carrierCode).toBe(newAirline.carrierCode);
  expect(data.airlineName).toBe(newAirline.airlineName);
  expect(data.logoUrl).toBe(newAirline.logoUrl);
  expect(data.country).toBe(newAirline.country);
  expect(data.isLowCost).toBe(newAirline.isLowCost);

  createdAirlineId = data._id;
});

test.afterEach(async () => {
  if (createdAirlineId) {
    const { res } = await deleteAirlineById(createdAirlineId, token);
    expect(res.status()).toBe(200);
    createdAirlineId = null;
  }
});
