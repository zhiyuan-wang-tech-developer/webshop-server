import AdminUser from "../../entity/admin.user";
import { TableAction } from "../../utils/custom.types";
import { LoginDataPayload } from "../../security/json.web.token";

export default interface AdminUsersManager {
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
