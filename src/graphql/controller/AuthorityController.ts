import { Controller, Query, Mutation } from "vesper";
import AuthorityManager from "../../management/Authority/Manager";
import AuthorityManagerImpl from "../../management/Authority/ManagerImpl";

@Controller()
export class AuthorityController {
  private authorityManager: AuthorityManager;

  constructor() {
    this.authorityManager = new AuthorityManagerImpl();
  }

  // serve the query request "tables: [Table]"
  @Query()
  async tables() {
    const tables = await this.authorityManager.getTables();
    return tables;
  }

  // serve the query request "actions: [String]"
  @Query()
  async actions(args: any) {
    const { groupId, tableId } = args;
    const actions = await this.authorityManager.getActionsByGroupAndTable(
      groupId,
      tableId
    );
    return actions;
  }

  // serve the query request "authorities(groupId: Int, tableId: Int): [Authority]"
  @Query()
  async authorities(args: any) {
    const { groupId, tableId } = args;
    const authorities = await this.authorityManager.getAuthoritiesByGroupAndTable(
      groupId,
      tableId
    );
    return authorities;
  }

  // serve the mutation request "authorityCreate(groupId: Int, tableId: Int, action: String): Authority"
  @Mutation()
  async authorityCreate(args: any) {
    const createdAuthority = await this.authorityManager.createAuthority({
      ...args,
    });
    return createdAuthority;
  }

  // serve the mutation request "authorityDelete(groupId: Int, tableId: Int, action: String): Boolean"
  @Mutation()
  async authorityDelete(args: any) {
    const isDeleted: boolean = await this.authorityManager.deleteAuthority({
      ...args,
    });
    return isDeleted;
  }
}
