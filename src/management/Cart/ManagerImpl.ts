import User from "../../entity/User";
import ShoppingCartItem from "../../entity/ShoppingCartItem";
import InventoryItem from "../../entity/InventoryItem";
import CartManager, { UserCartItemsDataType } from "./Manager";
import UserManager from "../User/Manager";
import UserManagerImpl from "../User/ManagerImpl";
import ItemManager from "../Item/Manager";
import ItemManagerImpl from "../Item/ManagerImpl";

export default class CartManagerImpl implements CartManager {
  // Use data mapper pattern for maintainability
  private userManager: UserManager;
  private itemManager: ItemManager;

  constructor() {
    this.userManager = new UserManagerImpl();
    this.itemManager = new ItemManagerImpl();
  }

  async getItemsFromCart(id: number): Promise<UserCartItemsDataType> {
    const user: User = await this.userManager.getUserById(id);
    return {
      userId: user.id,
      shoppingCartItems: user.shoppingCart.shoppingCartItems,
    };
  }

  async addItemToCart(
    userId: number,
    itemId: number
  ): Promise<UserCartItemsDataType> {
    // Create a new shopping cart item based on the given itemId and add it to the shopping cart of the given userId.
    const user: User = await this.userManager.getUserById(userId);
    const inventoryItem: InventoryItem = await this.itemManager.getItemById(
      itemId
    );
    const cartItem: ShoppingCartItem = new ShoppingCartItem();
    cartItem.inventoryItem = inventoryItem;
    user.shoppingCart.shoppingCartItems.push(cartItem);
    await user.save();
    await user.reload();

    return {
      userId: user.id,
      shoppingCartItems: user.shoppingCart.shoppingCartItems,
    };
  }

  async updateItemInCart(
    userId: number,
    itemId: number,
    amount: number
  ): Promise<UserCartItemsDataType> {
    const user: User = await this.userManager.getUserById(userId);
    const newCartItems: ShoppingCartItem[] = user.shoppingCart.shoppingCartItems.map(
      (cartItem: ShoppingCartItem) => {
        // value equality not type equality
        if (cartItem.inventoryItem.id == itemId) {
          cartItem.amount = amount;
        }
        return cartItem;
      }
    );
    user.shoppingCart.shoppingCartItems = newCartItems;
    await user.save();
    await user.reload();

    return {
      userId: user.id,
      shoppingCartItems: user.shoppingCart.shoppingCartItems,
    };
  }

  async removeItemFromCart(
    userId: number,
    itemId: number
  ): Promise<UserCartItemsDataType> {
    const user: User = await this.userManager.getUserById(userId);

    // remove cart item with the given itemId from the 'Shopping Cart Items' Table.
    const cartItemToDelete: ShoppingCartItem[] = user.shoppingCart.shoppingCartItems.filter(
      (cartItem: ShoppingCartItem) => cartItem.inventoryItem.id == itemId
    );
    cartItemToDelete[0].remove();

    // update cart items (filter out cart items whose inventoryItemId is not equal to the given itemId).
    const newCartItems: ShoppingCartItem[] = user.shoppingCart.shoppingCartItems.filter(
      (cartItem: ShoppingCartItem) => cartItem.inventoryItem.id != itemId
    );
    user.shoppingCart.shoppingCartItems = newCartItems;
    await user.save();
    await user.reload();

    return {
      userId: user.id,
      shoppingCartItems: user.shoppingCart.shoppingCartItems,
    };
  }

  async clearCart(userId: number): Promise<UserCartItemsDataType> {
    const user: User = await this.userManager.getUserById(userId);

    // delete all cart items of the given userId
    user.shoppingCart.shoppingCartItems.forEach(
      async (cartItem: ShoppingCartItem) => await cartItem.remove()
    );
    user.shoppingCart.shoppingCartItems = [];
    await user.save();
    await user.reload();

    return {
      userId: user.id,
      shoppingCartItems: user.shoppingCart.shoppingCartItems,
    };
  }
}
