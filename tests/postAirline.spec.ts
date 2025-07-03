import { test, request, expect } from "@playwright/test";
import { loginAndGetToken } from "../helpers/auth.helper";
import { postAirline } from "../helpers/airline.helper";

let createdAirlineId: string | null = null;
let token: string;

test.beforeAll(async () => {
  token = await loginAndGetToken();
});

test("POST /airline should create a new airline with correct values", async ({
  baseURL,
}) => {
  // 2. เตรียมข้อมูล airline ที่จะโพสต์
  const newAirline = {
    carrierCode: "JL",
    airlineName: "Japan Airlines",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/84/Japan_Airlines_logo.svg",
    country: "Japan",
    isLowCost: false,
  };

  // 4. POST /airline
  const { res, body } = await postAirline(newAirline, token);

  // 5. Assertion
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

  createdAirlineId = body.data._id; // เก็บ ID ไว้สำหรับลบ
});

test.afterEach(async () => {
  if (createdAirlineId) {
    const context = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const res = await context.delete(
      `${process.env.BASE_URL}/api/v1/airline-core-api/airline/${createdAirlineId}`
    );
    expect(res.status()).toBe(200);
    createdAirlineId = null;
  }
});
