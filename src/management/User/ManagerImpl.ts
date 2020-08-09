import {
  LoginDataPayloadType,
  JWTDataPayloadType,
  signData,
} from "../../security/JsonWebToken";
import { NotFoundError, BadRequestError } from "routing-controllers";
import { getRepository, Repository, UpdateResult, DeleteResult } from "typeorm";
import User from "../../entity/User";
import ShoppingCart from "../../entity/ShoppingCart";
import UserManager from "./Manager";
import ShoppingCartItem from "../../entity/ShoppingCartItem";

export default class UserManagerImpl implements UserManager {
  // Use data mapper pattern for maintainability
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
    // this.cartManager = new CartManagerImple();
  }

  async createUser(user: User): Promise<User> {
    // Create a new shopping cart
    const shoppingCart = new ShoppingCart();
    // Associate shopping cart with user
    user.shoppingCart = shoppingCart;
    // Save new user and generate its primary key "user.id"
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(userId);
      return user;
    } catch (error) {
      throw new NotFoundError(`User with id ${userId} not found! ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new NotFoundError(`User with email ${email} not found! ${error}`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async updateUser(userId: number, user: Partial<User>): Promise<User> {
    const result: UpdateResult = await this.userRepository.update(userId, user);
    console.log(`Update result: ${JSON.stringify(result)}`);
    if (result.affected && result.affected === 1) {
      return this.getUserById(userId);
    } else {
      throw new Error(`User with id ${userId} not updated!`);
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    const user: User = await this.userRepository.findOneOrFail(userId);

    // TODO: why cartManager cause call stack overflow?
    // TODO: Why I can not use "await this.cartManager.clearCart(userId)" instead of line 76...80.
    user.shoppingCart.shoppingCartItems.forEach(
      async (cartItem: ShoppingCartItem) => await cartItem.remove()
    );
    user.shoppingCart.shoppingCartItems = [];
    await user.shoppingCart.remove();

    const result: DeleteResult = await this.userRepository.delete(userId);
    // console.log(`Delete result: ${JSON.stringify(result)}`);
    if (result.affected && result.affected === 1) {
      return true;
    } else {
      throw new Error(`User with id ${userId} not deleted!`);
    }
  }

  async loginUser(loginData: LoginDataPayloadType): Promise<string> {
    const { email, password } = loginData;
    try {
      // 1. Look up the login user in database by the email field.
      const user = await User.findOneOrFail({ where: { email } });
      // 2. Check up password corectness.
      if (password != user.password) {
        throw new Error("Login with incorrect password!");
      }

      /**
       * NOTE: If you remove ! after user.id, your IDE will complain about
       * the fact that user.id might be undefined.
       * An exclamation mark ! tells the TypeScript compiler
       * 'don't worry, I know for sure this is not going to be undefined'.
       */
      const data: JWTDataPayloadType = {
        id: user.id!,
        name: user.name,
        email: user.email,
      };

      // 3. Sign data and generate a JSON web token.
      const token: string = signData(data);
      // 4. Send back the JSON web token if user exists and password is correct.
      return token;
    } catch (error) {
      console.log(JSON.stringify(error));
      // If user does not exist or password is incorrect, send 400 bad request error
      throw new BadRequestError(JSON.stringify(error));
    }
  }
}
