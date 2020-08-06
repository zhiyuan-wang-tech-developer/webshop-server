import { JsonController, Get, Param } from "routing-controllers";
import { AuthorityActionType } from "../utils/CustomTypes";
import AuthorityManager from "../management/AuthorityManager";
import AuthorityManagerImpl from "../management/AuthorityManagerImpl";

@JsonController("/authorities")
export class AuthorityController {
  private authorityManager: AuthorityManager;

  constructor() {
    this.authorityManager = new AuthorityManagerImpl();
  }

  @Get("/table/:tableId/action/:action")
  async getGroups(
    @Param("tableId") tableId: number,
    @Param("action") action: AuthorityActionType
  ) {
    const groupIds: number[] = await this.authorityManager.getGroupByTableAndAction(
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
    const actions: AuthorityActionType[] = await this.authorityManager.getAllActionsByGroupAndTable(
      groupId,
      tableId
    );
    return { actions };
  }
}
