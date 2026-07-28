import { ProductsPage } from "../pages/productsPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { Product } from "../test-data/products";

export class AddProductsToCartFlow {
  // ─────────────────────────────────────────────
  // Page Objects
  // ─────────────────────────────────────────────

  constructor(
    private productsPage: ProductsPage,
    private productsDetailsPage: ProductDetailsPage,
  ) {}

  // ─────────────────────────────────────────────
  // Product Addition Flow
  // ─────────────────────────────────────────────

  /**
   * Adds multiple products to the shopping cart using their
   * product IDs and requested quantities.
   *
   * For each product, the flow:
   * 1. Navigates to the product details page.
   * 2. Retrieves the product information.
   * 3. Stores the product information for later validation.
   * 4. Sets the requested quantity.
   * 5. Adds the product to the cart.
   * 6. Verifies that the Add to Cart confirmation modal is visible.
   * 7. Continues shopping if additional products remain to be added.
   *
   * @param productsToAdd - An array containing the IDs and quantities
   * of the products to add to the cart.
   *
   * @returns An array of Product objects containing the information
   * retrieved from each product details page.
   */
  async addProducts(
    productsToAdd: { id: string; quantity: number }[],
  ): Promise<Product[]> {
    const products: Product[] = [];

    for (let i = 0; i < productsToAdd.length; i++) {
      const { id, quantity } = productsToAdd[i];

      await this.productsDetailsPage.openProductById(id);

      const product = await this.productsDetailsPage.getProductInformation(
        id,
        quantity,
      );

      products.push(product);

      await this.productsDetailsPage.setQuantity(quantity);
      await this.productsDetailsPage.addToCart();

      await this.productsDetailsPage.verifyAddedModalVisible();

      if (i < productsToAdd.length - 1) {
        await this.productsDetailsPage.continueShopping();
      }
    }

    return products;
  }
}
