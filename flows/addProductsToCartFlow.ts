import { ProductsPage } from "../pages/productsPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { Product } from "../test-data/products";

export class AddProductsToCartFlow {
  constructor(
    private productsPage: ProductsPage,
    private productsDetailsPage: ProductDetailsPage,
  ) {}

  async addProducts(productIds: string[]): Promise<Product[]> {
    const products: Product[] = [];

    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i]; //for each product id given, open its page, add its info to products array, go back to products page, add to cart, continue into all added

      await this.productsPage.openProductById(productId);

      products.push(
        await this.productsDetailsPage.getProductInformation(productId),
      );

      await this.productsDetailsPage.goBack();

      await this.productsPage.addProductToCart(productId);
      await this.productsPage.verifyAddedModalVisible();

      if (i < productIds.length - 1) {
        await this.productsPage.continueShopping();
      }
    }

    return products;
  }
}
