import AdminUser from "../../entity/AdminUsers";
import { TableAction } from "../../utils/CustomTypes";
import { LoginDataPayload } from "../../security/JsonWebToken";

export default interface AdminUserManager {
  getAdminUserById(adminUserId: number): Promise<AdminUser>;

  getTableActionsByAdminUser(adminUserId: number): Promise<TableAction[]>;

  getAdminUsers(): Promise<AdminUser[]>;

  createAdminUser(adminUser: AdminUser): Promise<AdminUser>;

  updateAdminUser(
    adminUserId: number,
    adminUser: Partial<AdminUser>
  ): Promise<AdminUser>;

  deleteAdminUser(adminUserId: number): Promise<boolean>;

  loginAdminUser(loginData: LoginDataPayload): Promise<AdminUser>;
}
