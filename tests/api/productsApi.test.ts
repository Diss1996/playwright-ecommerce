import { test, expect } from "@playwright/test";

test("GET all products", async ({ request }) => {
  const response = await request.get(
    "/api/productsList",
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
  expect(body).toHaveProperty("products");
  expect(Array.isArray(body.products)).toBe(true);
});

test("POST to products returns method-not-supported response", async ({
  request,
}) => {
  const response = await request.post("/api/productsList");

  // Automation Exercise returns HTTP 200,
  // but reports the 405 error inside the response body.
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});
