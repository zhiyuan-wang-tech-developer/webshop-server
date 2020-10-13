import {
  JsonController,
  Body,
  Get,
  Param,
  Post,
  HttpCode,
  Put,
  Delete,
} from "routing-controllers";
import Group from "../entity/group";
import GroupsService from "../service/groups.service";

@JsonController("/admin/groups")
export class AdminGroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getGroups() {
    const groups: Group[] = await this.groupsService.groupsManager.getGroups();
    return { groups };
  }

  @Get("/:id")
  async getGroupById(@Param("id") groupId: number) {
    const group: Group = await this.groupsService.groupsManager.getGroupById(
      groupId
    );
    return { group };
  }

  @Post()
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createGroup(@Body() group: Group) {
    const createdGroup: Group = await this.groupsService.groupsManager.createGroup(
      group
    );
    return { createdGroup };
  }

  @Put("/:id")
  async updateGroup(
    @Param("id") groupId: number,
    @Body() group: Partial<Group>
  ) {
    const updatedGroup: Group = await this.groupsService.groupsManager.updateGroup(
      groupId,
      group
    );
    return { updatedGroup };
  }

  @Delete("/:id")
  async deleteGroup(@Param("id") groupId: number) {
    const groupIsDeleted: boolean = await this.groupsService.groupsManager.deleteGroup(
      groupId
    );
    return { groupIsDeleted };
  }
}
