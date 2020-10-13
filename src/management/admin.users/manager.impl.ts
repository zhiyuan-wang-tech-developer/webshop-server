import { NotFoundError, BadRequestError } from "routing-controllers";
import { getRepository, Repository, DeleteResult } from "typeorm";
import { Service } from "typedi";
import { AuthorityAction, TableAction } from "../../utils/custom.types";
import { LoginDataPayload } from "../../security/json.web.token";
import AdminUser from "../../entity/admin.user";
import Authority from "../../entity/authority";
import Table from "../../entity/table";
import AdminUsersManager from "./manager";
import { ADMIN_USERS_MANAGER } from "../../constants/service.names";

@Service(ADMIN_USERS_MANAGER)
export default class AdminUsersManagerImpl implements AdminUsersManager {
  // Use data mapper pattern for maintainability
  private adminUserRepository: Repository<AdminUser>;

  constructor() {
    this.adminUserRepository = getRepository(AdminUser);
    AdminUsersManagerImpl.verifySystemAdmin();
  }

  private static SystemAdmin = {
    id: 1,
    name: "admin",
    email: "admin@system.com",
    password: "admin",
    adminUserGroups: [],
  };

  /**
   * @summary verify if the system admin user exists in the database
   */
  private static async verifySystemAdmin() {
    const systemAdmin = await AdminUser.findOne(
      AdminUsersManagerImpl.SystemAdmin.id
    );
    if (
      !systemAdmin ||
      JSON.stringify(systemAdmin) !==
        JSON.stringify(AdminUsersManagerImpl.SystemAdmin)
    ) {
      const newSystemAdmin = AdminUser.create(
        AdminUsersManagerImpl.SystemAdmin
      );
      newSystemAdmin.id = 1;
      await AdminUser.save(newSystemAdmin);
      console.log(newSystemAdmin);
    }
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

  async getTableActionsByAdminUser(
    adminUserId: number
  ): Promise<TableAction[]> {
    const tables: Table[] = await Table.find();

    let tableActions: TableAction[] = [];

    let tableAction: TableAction = {
      tableId: 0,
      tableName: "",
      actions: [],
    };

    if (adminUserId === 1) {
      for (const table of tables) {
        tableAction.tableId = table.id!;
        tableAction.tableName = table.name;
        tableAction.actions = [AuthorityAction.ALL];
        tableActions.push(Object.assign({}, tableAction)); // deep copy table action and push it into array
      }
      return tableActions;
    }

    const adminUser: AdminUser = await this.adminUserRepository.findOneOrFail(
      adminUserId
    );

    for (let table of tables) {
      tableAction.tableId = table.id!;
      tableAction.tableName = table.name;
      tableAction.actions = [];
      for (let group of adminUser.adminUserGroups) {
        let authorities: Authority[] = await Authority.find({
          where: {
            groupId: group.id,
            tableId: table.id,
          },
        });
        let actions: AuthorityAction[] = authorities.map(
          (authority: Authority) => authority.action
        );
        tableAction.actions = tableAction.actions.concat(actions);
      }
      if (tableAction.actions.includes(AuthorityAction.ALL)) {
        tableAction.actions = [AuthorityAction.ALL];
      } else {
        // remove duplicate from an array
        tableAction.actions = Array.from(
          new Set<AuthorityAction>(tableAction.actions)
        );
      }
      tableActions.push(Object.assign({}, tableAction)); // deep copy table action and push it into array
    }
    return tableActions;
  }

  async createAdminUser(adminUser: AdminUser): Promise<AdminUser> {
    const newAdminUser = await this.adminUserRepository.save(adminUser);
    return newAdminUser;
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

  async loginAdminUser(loginData: LoginDataPayload): Promise<AdminUser> {
    const { email, password } = loginData;

    // 1. Look up the login admin user in database by the email field.
    const adminUser: AdminUser = await this.adminUserRepository.findOneOrFail({
      where: { email },
    });

    // 2. Check up the admin user's password corectness.
    if (password != adminUser.password) {
      throw new BadRequestError("Admin user login with incorrect password!");
    }

    return adminUser;
  }
}
