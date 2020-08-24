import { JsonController, Get, Param } from "routing-controllers";
import { Controller, Query, Mutation } from "vesper";
import { AuthorityAction } from "../utils/CustomTypes";
import AuthorityManager from "../management/Authority/Manager";
import AuthorityManagerImpl from "../management/Authority/ManagerImpl";

@Controller()
@JsonController("/authorities")
export class AuthorityController {
  private authorityManager: AuthorityManager;

  constructor() {
    this.authorityManager = new AuthorityManagerImpl();
  }

  @Get("/table/:tableId/action/:action")
  async getGroups(
    @Param("tableId") tableId: number,
    @Param("action") action: AuthorityAction
  ) {
    const groupIds: number[] = await this.authorityManager.getGroupsByTableAndAction(
      tableId,
      action
    );
    return { groupIds };
  }

  @Get("/group/:groupId/table/:tableId")
  async getActions(
    @Param("groupId") groupId: number,
    @Param("tableId") tableId: number
  ) {
    const actions: AuthorityAction[] = await this.authorityManager.getActionsByGroupAndTable(
      groupId,
      tableId
    );
    return { actions };
  }

  // serve the query request "tables: [Table]"
  @Query()
  async tables() {
    const tables = await this.authorityManager.getTables();
    return tables;
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
    return await this.authorityManager.deleteAuthority({ ...args });
  }
}
