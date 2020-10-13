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
import User from "../entity/user";
import UsersService from "../service/users.service";
import { LoginDataPayload } from "../security/json.web.token";

@JsonController("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users: User[] = await this.usersService.usersManager.getAllUsers();
    return { users };
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    const user: User = await this.usersService.usersManager.getUserById(id);
    return { user };
  }

  @Get()
  async getUserByEmail(@QueryParam("email") email: string) {
    const user: User = await this.usersService.usersManager.getUserByEmail(
      email
    );
    return { user };
  }

  @Post()
  async createUser(@Body() user: User) {
    const createdUser: User = await this.usersService.usersManager.createUser(
      user
    );
    return { createdUser };
  }

  @Put("/:id")
  async updateUser(@Param("id") id: number, @Body() user: Partial<User>) {
    const updatedUser: User = await this.usersService.usersManager.updateUser(
      id,
      user
    );
    return { updatedUser };
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: number) {
    const userIsDeleted: boolean = await this.usersService.usersManager.deleteUser(
      id
    );
    return { userIsDeleted };
  }

  @Post("/login")
  async loginUser(@Body() loginData: LoginDataPayload) {
    const token: string = await this.usersService.usersManager.loginUser(
      loginData
    );
    return { token };
  }
}
