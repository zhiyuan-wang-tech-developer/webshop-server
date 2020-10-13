import { Service, Inject } from "typedi";
import { CART_SERVICE, CART_MANAGER } from "../constants/service.names";
import CartManager from "../management/cart/manager";
import CartManagerImpl from "../management/cart/manager.impl";

@Service(CART_SERVICE)
export default class CartService {
  public readonly cartManager: CartManager;
  constructor(@Inject(CART_MANAGER) cartManager: CartManagerImpl) {
    this.cartManager = cartManager;
  }
}
