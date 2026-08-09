import { test, expect } from "../../fixtures/fixtures";

test("GET all products", async ({ request }) => {
  const response = await request.get("/api/productsList");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("products");
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);

  const product = body.products[0];

  expect(product).toHaveProperty("id");
  expect(product).toHaveProperty("name");
  expect(product).toHaveProperty("price");
  expect(product).toHaveProperty("brand");
  expect(product).toHaveProperty("category");

  expect(typeof product.id).toBe("number");
  expect(typeof product.name).toBe("string");
  expect(typeof product.price).toBe("string");
  expect(typeof product.brand).toBe("string");
  expect(typeof product.category).toBe("object");
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
