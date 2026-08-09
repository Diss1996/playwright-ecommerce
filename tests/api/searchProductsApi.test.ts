import { test, expect } from "../../fixtures/fixtures";

test("search products", async ({ request }) => {
  const searchTerm = "jeans";
  const response = await request.post("/api/searchProduct", {
    form: {
      search_product: searchTerm,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("products");
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);

  for (const product of body.products) {
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

    expect(product.name.toLowerCase()).toContain(searchTerm);
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

test("search products with no matching results", async ({ request }) => {
  const response = await request.post("/api/searchProduct", {
    form: {
      search_product: "thisProductDefinitelyDoesNotExist",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("products");
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBe(0);
});
