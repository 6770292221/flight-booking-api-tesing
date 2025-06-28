import { APIResponse, expect } from "@playwright/test";

/** ตรวจ status code */
export async function expectStatus(res: APIResponse, expected: number) {
  expect(res.status()).toBe(expected);
}

/** ตรวจว่ามี property (รองรับหลายอัน) */
export function expectHasProperties(obj: any, props: string[]) {
  props.forEach((prop) => {
    expect(obj).toHaveProperty(prop);
  });
}

/** ตรวจค่าจริง = ที่คาดไว้ (รองรับหลาย key-value) */
export function expectValues(actualObj: any, expectedObj: Record<string, any>) {
  for (const key in expectedObj) {
    expect(actualObj[key]).toBe(expectedObj[key]);
  }
}

/** ตรวจ regex เช่น URL */
export function expectMatchRegex(actual: string, pattern: RegExp) {
  expect(actual).toMatch(pattern);
}

/**
 * ตรวจสอบว่า value ที่ส่งเข้ามาเป็น array และมีความยาวอย่างน้อย minLength
 */
export function expectIsArrayWithMinLength(arr: any, minLength: number) {
  expect(Array.isArray(arr)).toBe(true);
  expect(arr.length).toBeGreaterThanOrEqual(minLength);
}

/**
 * ตรวจสอบว่า object มี key/field ที่ระบุอยู่ใน expectedFields ทั้งหมด
 */
export function expectObjectHasFields(obj: any, expectedFields: string[]) {
  for (const field of expectedFields) {
    expect(obj).toHaveProperty(field);
  }
}

/**
 * ตรวจสอบว่า object มีค่าของแต่ละ key ตรงกับ expectedValues
 * ใช้ในกรณีที่ต้องการ assert หลาย field และค่า
 */
export function expectObjectFieldValues(
  obj: any,
  expectedValues: Record<string, any>
) {
  for (const [key, expected] of Object.entries(expectedValues)) {
    expect(obj[key]).toBe(expected);
  }
}

/**
 * ตรวจสอบว่า field ใน object ตรงกับ regular expression ที่กำหนด
 * ใช้เช็คเช่น URL format หรือ pattern พิเศษ
 */
export function expectFieldMatches(obj: any, field: string, regex: RegExp) {
  expect(obj[field]).toMatch(regex);
}
