import ShoppingCartItem from "../../entity/shopping.cart.item";

export declare interface UserCartItemsDataType {
  userId: number | undefined;
  shoppingCartItems: ShoppingCartItem[];
}

export default interface CartManager {
  getItemsFromCart(userId: number): Promise<UserCartItemsDataType>;

  addItemToCart(userId: number, itemId: number): Promise<UserCartItemsDataType>;

  updateItemInCart(
    userId: number,
    itemId: number,
    amount: number
  ): Promise<UserCartItemsDataType>;

  removeItemFromCart(
    userId: number,
    itemId: number
  ): Promise<UserCartItemsDataType>;

  clearCart(userId: number): Promise<UserCartItemsDataType>;
}
