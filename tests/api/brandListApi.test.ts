import { test, expect } from "../../fixtures/fixtures";

test("GET all brands", async ({ request }) => {
  const response = await request.get("/api/brandsList");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("brands");
  expect(Array.isArray(body.brands)).toBe(true);
  expect(body.brands.length).toBeGreaterThan(0);

  const brand = body.brands[0];

  expect(brand).toHaveProperty("id");
  expect(brand).toHaveProperty("brand");
  expect(typeof brand.id).toBe("number");
  expect(typeof brand.brand).toBe("string");
});

test("PUT to brandsList returns method-not-supported response", async ({
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
