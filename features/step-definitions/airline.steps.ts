import { Given, When, Then, After } from "@cucumber/cucumber";
import { expect, APIResponse } from "@playwright/test";
import { loginAndGetToken } from "../../helpers/auth.helper";
import {
  postAirline,
  deleteAirlineById,
  getAirlineById,
  getAllAirlines,
  patchAirlineById,
} from "../../helpers/airline.helper";
import {
  expectStatus,
  expectValues,
  expectObjectHasFields,
  expectIsArrayWithMinLength,
} from "../../helpers/assert.helper";

let token: string;
let response: APIResponse;
let responseBody: any;
let createdAirlineId: string | null = null;
let airlines: any[] = [];

Given("I have a valid admin token", async () => {
  token = await loginAndGetToken();
});

When("I create a new airline with body:", async (docString: string) => {
  const jsonBody = JSON.parse(docString);
  const { res, body } = await postAirline(jsonBody, token);
  response = res;
  responseBody = body;
  createdAirlineId = body?.data?._id || null;
});

Then("the response status should be {int}", async (statusCode) => {
  await expectStatus(response, statusCode);
});

Then("the response body should contain:", (dataTable) => {
  const expected = Object.fromEntries(dataTable.raw());
  expectValues(responseBody, expected);
});

Then("the response data should contain fields:", (dataTable) => {
  const expectedFields = dataTable.raw().flat();
  expectObjectHasFields(responseBody.data, expectedFields);
});

After(async () => {
  if (!createdAirlineId || !token) return;
  const { res } = await deleteAirlineById(createdAirlineId, token);
  expect(res.status()).toBe(200);
  createdAirlineId = null;
});

When("I get airline by ID {string}", async (airlineId: string) => {
  const { res, body } = await getAirlineById(airlineId, token);
  response = res;
  responseBody = body;
});

When("I get the list of all airlines", async () => {
  const { res, body } = await getAllAirlines(token);
  response = res;
  responseBody = body;
  airlines = body.data.items;
});

Then("the airline list should have at least {int} items", (min: number) => {
  expectIsArrayWithMinLength(airlines, min);
});

Then("the first airline should have fields:", (dataTable) => {
  const expectedFields = dataTable.raw().flat();
  expectObjectHasFields(airlines[0], expectedFields);
});

Then("the first airline should contain values:", (dataTable) => {
  const expectedValues = Object.fromEntries(dataTable.raw());
  const firstItem = responseBody.data.items[0];

  // แปลง "true"/"false" จาก string เป็น boolean ถ้าจำเป็น
  for (const key in expectedValues) {
    if (expectedValues[key] === "true") expectedValues[key] = true;
    if (expectedValues[key] === "false") expectedValues[key] = false;
  }

  expectValues(firstItem, expectedValues);
});

Then(
  'the "{word}" field of the first airline should match {string}',
  (field: string, regexString: string) => {
    const firstItem = responseBody.data.items[0];
    const regex = new RegExp(regexString.slice(1, -1)); // ตัด /.../ ออก

    expect(firstItem[field]).toMatch(regex);
  }
);

When(
  "I update airline with ID {string} using body:",
  async (id: string, docString: string) => {
    const payload = JSON.parse(docString);
    const { res, body } = await patchAirlineById(id, payload, token);
    response = res;
    responseBody = body;
  }
);

Then("the response data should contain values:", (dataTable) => {
  const expected = Object.fromEntries(dataTable.raw());
  for (const key in expected) {
    const value = expected[key];
    // แปลงค่าจาก string -> boolean ถ้าเป็น true/false
    const parsedValue =
      value === "true" ? true : value === "false" ? false : value;
    expect(responseBody.data[key]).toBe(parsedValue);
  }
});
