import { test, expect } from "../../fixtures/fixtures";

test("search products", async ({ request }) => {
  const response = await request.post("/api/searchProduct", {
    form: {
      search_product: "jean",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.products).toBeDefined();
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);

  for (const product of body.products) {
    expect(product.name.toLowerCase()).toContain("jean");
  }
});

test("search products post without search parameter", async ({ request }) => {
  const response = await request.post("/api/searchProduct");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(400);
  expect(body.message).toBe(
    "Bad request, search_product parameter is missing in POST request.",
  );
});
