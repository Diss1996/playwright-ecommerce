import { ProductsPage } from "../pages/productsPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { Product } from "../test-data/products";

export class AddProductsToCartFlow {
  constructor(
    private productsPage: ProductsPage,
    private productsDetailsPage: ProductDetailsPage,
  ) {}

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
