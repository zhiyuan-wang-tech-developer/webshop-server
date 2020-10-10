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
import AdminUserManager from "../management/admin.user/manager";
import AdminUserManagerImpl from "../management/admin.user/manager.impl";
import AdminUser from "../entity/admin.user";
import { TableAction } from "../utils/custom.types";
import { LoginDataPayload } from "../security/json.web.token";

@JsonController("/admin")
export class AdminUsersController {
  private adminUserManager: AdminUserManager;

  constructor() {
    this.adminUserManager = new AdminUserManagerImpl();
  }

  @Get("/users")
  async getAdminUsers() {
    const adminUsers: AdminUser[] = await this.adminUserManager.getAdminUsers();
    return { adminUsers };
  }

  @Get("/users/:id")
  async getAdminUserById(@Param("id") adminUserId: number) {
    const adminUser: AdminUser = await this.adminUserManager.getAdminUserById(
      adminUserId
    );
    return { adminUser };
  }

  @Get("/users/:userId/actions")
  async getTableActionsByAdminUser(@Param("userId") adminUserId: number) {
    const tableActions: TableAction[] = await this.adminUserManager.getTableActionsByAdminUser(
      adminUserId
    );
    return { tableActions };
  }

  @Post("/users")
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createAdminUser(@Body() adminUser: AdminUser) {
    const createdAdminUser: AdminUser = await this.adminUserManager.createAdminUser(
      adminUser
    );
    return { createdAdminUser };
  }

  @Put("/users/:id")
  async updateAdminUser(
    @Param("id") adminUserId: number,
    @Body() adminUser: Partial<AdminUser>
  ) {
    const updatedAdminUser: AdminUser = await this.adminUserManager.updateAdminUser(
      adminUserId,
      adminUser
    );
    return { updatedAdminUser };
  }

  @Delete("/users/:id")
  async deleteAdminUser(@Param("id") adminUserId: number) {
    const adminUserIsDeleted: boolean = await this.adminUserManager.deleteAdminUser(
      adminUserId
    );
    return { adminUserIsDeleted };
  }

  @Post("/login")
  async loginAdminUser(@Body({ required: true }) loginData: LoginDataPayload) {
    const adminUser: AdminUser = await this.adminUserManager.loginAdminUser(
      loginData
    );
    return { adminUser };
  }
}
