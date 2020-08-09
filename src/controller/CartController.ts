import {
  JsonController,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HeaderParam,
  Authorized,
} from "routing-controllers";
import CartManager from "../management/Cart/Manager";
import CartManagerImpl from "../management/Cart/ManagerImpl";
import { getUserIdFromAuthorizationHeader } from "../security/JsonWebToken";

@JsonController("/cart")
export class CartController {
  private cartManager: CartManager;

  constructor() {
    this.cartManager = new CartManagerImpl();
  }

  @Authorized()
  @Get("")
  async getCartItems(@HeaderParam("authorization") authorization: string) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    console.log(`Get cart items for user ${userId}`);
    return await this.cartManager.getItemsFromCart(userId);
  }

  @Authorized()
  @Post("/item")
  async addCartItem(
    @HeaderParam("authorization") authorization: string,
    @Body() data: { itemId: number }
  ) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    const { itemId } = data;
    return await this.cartManager.addItemToCart(userId, itemId);
  }

  @Authorized()
  @Put("/item")
  async updateCartItem(
    @HeaderParam("authorization") authorization: string,
    @Body() data: { itemId: number; amount: number }
  ) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    const { itemId, amount } = data;
    return await this.cartManager.updateItemInCart(userId, itemId, amount);
  }

  @Authorized()
  @Delete("/item")
  async deleteCartItem(
    @HeaderParam("authorization") authorization: string,
    @Body() data: { itemId: number }
  ) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    const { itemId } = data;
    return await this.cartManager.removeItemFromCart(userId, itemId);
  }

  @Authorized()
  @Delete()
  async clearCart(@HeaderParam("authorization") authorization: string) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    return await this.cartManager.clearCart(userId);
  }
}
