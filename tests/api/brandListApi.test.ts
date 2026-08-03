import { test, expect } from "@playwright/test";

test("GET all brands", async ({ request }) => {
  const response = await request.get(
    "/api/brandsList",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
  expect(body).toHaveProperty("brands");
  expect(Array.isArray(body.brands)).toBe(true);
});

test("POST to brandsList returns method-not-supported response", async ({
  request,
}) => {
  const response = await request.put("/api/brandsList");

  // Automation Exercise returns HTTP 200,
  // but reports the 405 error inside the response body.
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});