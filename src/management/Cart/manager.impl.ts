import { Service, Inject } from "typedi";
import User from "../../entity/user";
import ShoppingCartItem from "../../entity/shopping.cart.item";
import InventoryItem from "../../entity/inventory.item";
import CartManager, { UserCartItemsDataType } from "./manager";
import {
  CART_MANAGER,
  USERS_MANAGER,
  ITEMS_MANAGER,
} from "../../constants/service.names";
import UsersManager from "../users/manager";
import UsersManagerImpl from "../users/manager.impl";
import ItemsManager from "../items/manager";
import ItemsManagerImpl from "../items/manager.impl";

@Service(CART_MANAGER)
export default class CartManagerImpl implements CartManager {
  private readonly usersManager: UsersManager;
  private readonly itemsManager: ItemsManager;

  constructor(
    @Inject(USERS_MANAGER) usersManager: UsersManagerImpl,
    @Inject(ITEMS_MANAGER) itemsManager: ItemsManagerImpl
  ) {
    this.usersManager = usersManager;
    this.itemsManager = itemsManager;
  }

  async getItemsFromCart(id: number): Promise<UserCartItemsDataType> {
    const user: User = await this.usersManager.getUserById(id);
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
    const user: User = await this.usersManager.getUserById(userId);
    const inventoryItem: InventoryItem = await this.itemsManager.getItemById(
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
    const user: User = await this.usersManager.getUserById(userId);
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
    const user: User = await this.usersManager.getUserById(userId);

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
    const user: User = await this.usersManager.getUserById(userId);

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
