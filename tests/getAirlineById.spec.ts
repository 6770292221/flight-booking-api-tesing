import { test, request, expect } from "@playwright/test";
import { getAirlineById } from "../helpers/airline.helper";
import { expectStatus, expectValues } from "../helpers/assert.helper"; // ปรับตาม path จริงของคุณ

test("should return correct airline by ID", async () => {
  const airlineId = "67fa2f6d208cdb649f55f757";

  // เรียก helper โดยส่ง context + id
  const { res, body } = await getAirlineById(airlineId);

  // Assertion
  expectStatus(res, 200);

  // เช็ค Body Response หลัก
  expectValues(body, {
    status: "success",
    code: "AIR_1004",
    message: "Airports retrieved successfully.",
  });

  // เช็คข้อมูลใน data
  expectValues(body.data, {
    _id: "67fa2f6d208cdb649f55f757",
    carrierCode: "TG",
    airlineName: "Thai Airways International",
    country: "Thailand",
    isLowCost: true,
  });
});
