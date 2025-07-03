import { test, request, expect } from "@playwright/test";
import { getAllAirlines } from "../helpers/airline.helper";
import {
  expectStatus,
  expectValues,
  expectIsArrayWithMinLength,
  expectObjectHasFields,
  expectObjectFieldValues,
  expectFieldMatches,
} from "../helpers/assert.helper";

test("GET /airlines returns correct airline", async () => {
  const { res, body } = await getAllAirlines();

  // ตรวจ response
  await expectStatus(res, 200);
  expectValues(body, {
    status: "success",
    code: "AIR_1004",
    message: "Airports retrieved successfully.",
  });

  // ตรวจ array
  const items = body.data.items;
  expectIsArrayWithMinLength(items, 5);

  // ตรวจ fields ของ item[0]
  expectObjectHasFields(items[0], [
    "_id",
    "carrierCode",
    "airlineName",
    "logoUrl",
    "country",
    "isLowCost",
    "updatedAt",
    "createdAt",
  ]);

  // ตรวจค่าที่คาดหวัง
  expectValues(items[0], {
    carrierCode: "DD",
    airlineName: "Nok Air",
    country: "Thailand",
    isLowCost: true,
  });

  // ตรวจ logoUrl
  expectFieldMatches(
    items[0],
    "logoUrl",
    /^https:\/\/(raw\.githubusercontent\.com|upload\.wikimedia\.org)/
  );
});
