import { Controller, Query, Mutation } from "vesper";
import AuthorityService from "../../service/authority.service";
import Container from "typedi";
import { AUTHORITY_SERVICE } from "../../constants/service.names";

@Controller()
export class AuthorityController {
  constructor(private authorityService: AuthorityService) {
    this.authorityService = Container.get<AuthorityService>(AUTHORITY_SERVICE);
  }

  // serve the query request "tables: [Table]"
  @Query()
  async tables() {
    const tables = await this.authorityService.authorityManager.getTables();
    return tables;
  }

  // serve the query request "actions: [String]"
  @Query()
  async actions(args: any) {
    const { groupId, tableId } = args;
    const actions = await this.authorityService.authorityManager.getActionsByGroupAndTable(
      groupId,
      tableId
    );
    return actions;
  }

  // serve the query request "authorities(groupId: Int, tableId: Int): [Authority]"
  @Query()
  async authorities(args: any) {
    const { groupId, tableId } = args;
    const authorities = await this.authorityService.authorityManager.getAuthoritiesByGroupAndTable(
      groupId,
      tableId
    );
    return authorities;
  }

  // serve the mutation request "authorityCreate(groupId: Int, tableId: Int, action: String): Authority"
  @Mutation()
  async authorityCreate(args: any) {
    const createdAuthority = await this.authorityService.authorityManager.createAuthority(
      {
        ...args,
      }
    );
    return createdAuthority;
  }

  // serve the mutation request "authorityDelete(groupId: Int, tableId: Int, action: String): Boolean"
  @Mutation()
  async authorityDelete(args: any) {
    const isDeleted: boolean = await this.authorityService.authorityManager.deleteAuthority(
      {
        ...args,
      }
    );
    return isDeleted;
  }
}
