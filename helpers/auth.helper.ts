// helpers/auth.helper.ts
import { request } from "@playwright/test";

export async function loginAndGetToken(): Promise<string> {
  const baseURL = process.env.BASE_URL!;
  const email = process.env.OTP_EMAIL!;
  const password = process.env.OTP_PASSWORD!;

  const context = await request.newContext();

  // Step 1: login (trigger OTP)
  const loginRes = await context.post(
    `${baseURL}/api/v1/user-core-api/auth/login`,
    {
      headers: { "Content-Type": "application/json" },
      data: { email, password },
    }
  );

  const loginBody = await loginRes.json();
  const userId = loginBody.data.userId;

  // Step 2: verify OTP (mocked with 123456)
  const verifyRes = await context.post(
    `${baseURL}/api/v1/user-core-api/auth/email-otp/verify`,
    {
      headers: { "Content-Type": "application/json" },
      data: {
        userId,
        otp: "123456", // ถ้าอยากให้ดึงจาก Redis จริงทีหลัง ค่อยอัปเดตอีกที
      },
    }
  );

  const verifyBody = await verifyRes.json();
  return verifyBody.data.token;
}
