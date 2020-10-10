import {
  JsonController,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Body,
} from "routing-controllers";
import { AuthorityAction } from "../utils/custom.types";
import Authority from "../entity/authority";
import AuthorityManager from "../management/authority/manager";
import AuthorityManagerImpl from "../management/authority/manager.impl";

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

  @Get("/tables")
  async getTables() {
    const tables = await this.authorityManager.getTables();
    return { tables };
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

  @Post()
  @HttpCode(201)
  async createAuthority(@Body() authority: Authority) {
    const createdAuthority = await this.authorityManager.createAuthority(
      authority
    );
    return { createdAuthority };
  }

  @Delete()
  async deleteAuthority(@Body() authority: Authority) {
    const isAuthorityDeleted: boolean = await this.authorityManager.deleteAuthority(
      authority
    );
    return { isAuthorityDeleted };
  }
}
