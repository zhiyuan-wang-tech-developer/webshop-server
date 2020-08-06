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
import AdminUserManager from "../management/AdminUserManager";
import AdminUserManagerImpl from "../management/AdminUserManagerImpl";
import AdminUser from "../entity/AdminUsers";
import { Group } from "../entity/Groups";

@JsonController("/admin/users")
export class AdminUserController {
  private adminUserManager: AdminUserManager;

  constructor() {
    this.adminUserManager = new AdminUserManagerImpl();
  }

  @Get()
  async getAdminUsers() {
    const adminUsers: AdminUser[] = await this.adminUserManager.getAdminUsers();
    return { adminUsers };
  }

  @Get("/:id")
  async getAdminUserById(@Param("id") adminUserId: number) {
    const adminUser: AdminUser = await this.adminUserManager.getAdminUserById(
      adminUserId
    );
    return { adminUser };
  }

  @Post()
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createAdminUser(@Body() adminUser: AdminUser) {
    const createdAdminUser: AdminUser = await this.adminUserManager.createAdminUser(
      adminUser
    );
    return { createdAdminUser };
  }

  @Put("/:id")
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

  @Delete("/:id")
  async deleteAdminUser(@Param("id") adminUserId: number) {
    const adminUserIsDeleted: boolean = await this.adminUserManager.deleteAdminUser(
      adminUserId
    );
    return { adminUserIsDeleted };
  }
}