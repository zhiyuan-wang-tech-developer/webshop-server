import { NotFoundError } from "routing-controllers";
import { getRepository, Repository, DeleteResult } from "typeorm";
import AdminUser from "../../entity/AdminUsers";
import AdminUserManager from "./Manager";

export default class AdminUserManagerImpl implements AdminUserManager {
  // Use data mapper pattern for maintainability
  private adminUserRepository: Repository<AdminUser>;

  constructor() {
    this.adminUserRepository = getRepository(AdminUser);
  }

  async createAdminUser(adminUser: AdminUser): Promise<AdminUser> {
    const newAdminUser = await this.adminUserRepository.save(adminUser);
    return newAdminUser;
  }

  async getAdminUserById(adminUserId: number): Promise<AdminUser> {
    try {
      const adminUser = await this.adminUserRepository.findOneOrFail(
        adminUserId
      );
      return adminUser;
    } catch (error) {
      throw new NotFoundError(
        `Admin User with id ${adminUserId} not found! ${error}`
      );
    }
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    const adminUsers = await this.adminUserRepository.find();
    return adminUsers;
  }

  async updateAdminUser(
    adminUserId: number,
    adminUser: Partial<AdminUser>
  ): Promise<AdminUser> {
    const adminUserToUpdate: AdminUser = await this.getAdminUserById(
      adminUserId
    );
    Object.assign(adminUserToUpdate, adminUser);
    return await this.adminUserRepository.save(adminUserToUpdate);
  }

  async deleteAdminUser(adminUserId: number): Promise<boolean> {
    const adminUser: AdminUser = await this.adminUserRepository.findOneOrFail(
      adminUserId
    );
    const result: DeleteResult = await this.adminUserRepository.delete(
      adminUserId
    );
    if (result.affected && result.affected === 1) {
      return true;
    } else {
      throw new Error(`Admin User with id ${adminUserId} not deleted!`);
    }
  }
}
