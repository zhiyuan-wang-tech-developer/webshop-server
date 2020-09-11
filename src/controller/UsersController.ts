import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  QueryParam,
} from "routing-controllers";
import User from "../entity/User";
import UserManager from "../management/User/Manager";
import UserManagerImpl from "../management/User/ManagerImpl";
import { LoginDataPayload } from "../security/JsonWebToken";

@JsonController("/users")
export class UsersController {
  private userManager: UserManager;

  constructor() {
    this.userManager = new UserManagerImpl();
  }

  @Get()
  async getUsers() {
    const users: User[] = await this.userManager.getAllUsers();
    return { users };
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    const user: User = await this.userManager.getUserById(id);
    return { user };
  }

  @Get()
  async getUserByEmail(@QueryParam("email") email: string) {
    const user: User = await this.userManager.getUserByEmail(email);
    return { user };
  }

  @Post()
  async createUser(@Body() user: User) {
    const createdUser: User = await this.userManager.createUser(user);
    return { createdUser };
  }

  @Put("/:id")
  async updateUser(@Param("id") id: number, @Body() user: Partial<User>) {
    const updatedUser: User = await this.userManager.updateUser(id, user);
    return { updatedUser };
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: number) {
    const userIsDeleted: boolean = await this.userManager.deleteUser(id);
    return { userIsDeleted };
  }

  @Post("/login")
  async loginUser(@Body() loginData: LoginDataPayload) {
    const token: string = await this.userManager.loginUser(loginData);
    return { token };
  }
}
