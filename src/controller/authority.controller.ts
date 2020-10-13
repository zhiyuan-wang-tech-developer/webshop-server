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
import AuthorityService from "../service/authority.service";

@JsonController("/authorities")
export class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  @Get("/table/:tableId/action/:action")
  async getGroups(
    @Param("tableId") tableId: number,
    @Param("action") action: AuthorityAction
  ) {
    const groupIds: number[] = await this.authorityService.authorityManager.getGroupsByTableAndAction(
      tableId,
      action
    );
    return { groupIds };
  }

  @Get("/tables")
  async getTables() {
    const tables = await this.authorityService.authorityManager.getTables();
    return { tables };
  }

  @Get("/group/:groupId/table/:tableId")
  async getActions(
    @Param("groupId") groupId: number,
    @Param("tableId") tableId: number
  ) {
    const actions: AuthorityAction[] = await this.authorityService.authorityManager.getActionsByGroupAndTable(
      groupId,
      tableId
    );
    return { actions };
  }

  @Post()
  @HttpCode(201)
  async createAuthority(@Body() authority: Authority) {
    const createdAuthority = await this.authorityService.authorityManager.createAuthority(
      authority
    );
    return { createdAuthority };
  }

  @Delete()
  async deleteAuthority(@Body() authority: Authority) {
    const isAuthorityDeleted: boolean = await this.authorityService.authorityManager.deleteAuthority(
      authority
    );
    return { isAuthorityDeleted };
  }
}
