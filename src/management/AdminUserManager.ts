import AdminUser from "../entity/AdminUsers";

export default interface AdminUserManager {
  createAdminUser(adminUser: AdminUser): Promise<AdminUser>;

  getAdminUserById(adminUserId: number): Promise<AdminUser>;

  getAdminUsers(): Promise<AdminUser[]>;

  updateAdminUser(
    adminUserId: number,
    adminUser: Partial<AdminUser>
  ): Promise<AdminUser>;

  deleteAdminUser(adminUserId: number): Promise<boolean>;
}
