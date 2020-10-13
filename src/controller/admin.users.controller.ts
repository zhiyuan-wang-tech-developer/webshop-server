import {
  JsonController,
  Body,
  Get,
  Param,
  Post,
  HttpCode,
  Put,
  Delete,
} from "routing-controllers";
import AdminUser from "../entity/admin.user";
import AdminUsersService from "../service/admin.users.service";
import { TableAction } from "../utils/custom.types";
import { LoginDataPayload } from "../security/json.web.token";

@JsonController("/admin")
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get("/users")
  async getAdminUsers() {
    const adminUsers: AdminUser[] = await this.adminUsersService.adminUsersManager.getAdminUsers();
    return { adminUsers };
  }

  @Get("/users/:id")
  async getAdminUserById(@Param("id") adminUserId: number) {
    const adminUser: AdminUser = await this.adminUsersService.adminUsersManager.getAdminUserById(
      adminUserId
    );
    return { adminUser };
  }

  @Get("/users/:userId/actions")
  async getTableActionsByAdminUser(@Param("userId") adminUserId: number) {
    const tableActions: TableAction[] = await this.adminUsersService.adminUsersManager.getTableActionsByAdminUser(
      adminUserId
    );
    return { tableActions };
  }

  @Post("/users")
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createAdminUser(@Body() adminUser: AdminUser) {
    const createdAdminUser: AdminUser = await this.adminUsersService.adminUsersManager.createAdminUser(
      adminUser
    );
    return { createdAdminUser };
  }

  @Put("/users/:id")
  async updateAdminUser(
    @Param("id") adminUserId: number,
    @Body() adminUser: Partial<AdminUser>
  ) {
    const updatedAdminUser: AdminUser = await this.adminUsersService.adminUsersManager.updateAdminUser(
      adminUserId,
      adminUser
    );
    return { updatedAdminUser };
  }

  @Delete("/users/:id")
  async deleteAdminUser(@Param("id") adminUserId: number) {
    const adminUserIsDeleted: boolean = await this.adminUsersService.adminUsersManager.deleteAdminUser(
      adminUserId
    );
    return { adminUserIsDeleted };
  }

  @Post("/login")
  async loginAdminUser(@Body({ required: true }) loginData: LoginDataPayload) {
    const adminUser: AdminUser = await this.adminUsersService.adminUsersManager.loginAdminUser(
      loginData
    );
    return { adminUser };
  }
}
