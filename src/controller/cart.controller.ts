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
import CartService from "../service/cart.service";
import { getUserIdFromAuthorizationHeader } from "../security/json.web.token";

@JsonController("/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Authorized()
  @Get("")
  async getCartItems(@HeaderParam("authorization") authorization: string) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    console.debug(`Get cart items for user ${userId}`);
    return await this.cartService.cartManager.getItemsFromCart(userId);
  }

  @Authorized()
  @Post("/item")
  async addCartItem(
    @HeaderParam("authorization") authorization: string,
    @Body() data: { itemId: number }
  ) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    const { itemId } = data;
    return await this.cartService.cartManager.addItemToCart(userId, itemId);
  }

  @Authorized()
  @Put("/item")
  async updateCartItem(
    @HeaderParam("authorization") authorization: string,
    @Body() data: { itemId: number; amount: number }
  ) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    const { itemId, amount } = data;
    return await this.cartService.cartManager.updateItemInCart(
      userId,
      itemId,
      amount
    );
  }

  @Authorized()
  @Delete("/item")
  async deleteCartItem(
    @HeaderParam("authorization") authorization: string,
    @Body() data: { itemId: number }
  ) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    const { itemId } = data;
    return await this.cartService.cartManager.removeItemFromCart(
      userId,
      itemId
    );
  }

  @Authorized()
  @Delete()
  async clearCart(@HeaderParam("authorization") authorization: string) {
    const userId: number = getUserIdFromAuthorizationHeader(authorization);
    return await this.cartService.cartManager.clearCart(userId);
  }
}
