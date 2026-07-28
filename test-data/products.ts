/**
 * Represents the full product information displayed on the
 * Product Details page.
 *
 * The quantity property represents the quantity selected for
 * the product when it is added to the cart.
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  availability: string;
  condition: string;
  brand: string;
  quantity: number;
}

/**
 * Represents product information displayed in the shopping cart
 * and checkout order summary.
 *
 * Unlike Product, this interface does not contain availability,
 * condition, or brand information. Instead, it includes the total
 * price for the selected quantity of the product.
 */
export interface CartProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  total: string;
}
