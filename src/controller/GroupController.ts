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
import { Controller, Query } from "vesper";
import GroupManager from "../management/Group/Manager";
import GroupManagerImpl from "../management/Group/ManagerImpl";
import { Group } from "../entity/Groups";

@Controller()
@JsonController("/admin/groups")
export class GroupController {
  private groupManager: GroupManager;

  constructor() {
    this.groupManager = new GroupManagerImpl();
  }

  @Get()
  async getGroups() {
    const groups: Group[] = await this.groupManager.getGroups();
    return { groups };
  }

  // serve the query request "groups: [Group]"
  @Query()
  async groups() {
    const groups: Group[] = await this.groupManager.getGroups();
    return groups;
  }

  @Get("/:id")
  async getGroupById(@Param("id") groupId: number) {
    const group: Group = await this.groupManager.getGroupById(groupId);
    return { group };
  }

  @Post()
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createGroup(@Body() group: Group) {
    const createdGroup: Group = await this.groupManager.createGroup(group);
    return { createdGroup };
  }

  @Put("/:id")
  async updateGroup(
    @Param("id") groupId: number,
    @Body() group: Partial<Group>
  ) {
    const updatedGroup: Group = await this.groupManager.updateGroup(
      groupId,
      group
    );
    return { updatedGroup };
  }

  @Delete("/:id")
  async deleteGroup(@Param("id") groupId: number) {
    const groupIsDeleted: boolean = await this.groupManager.deleteGroup(
      groupId
    );
    return { groupIsDeleted };
  }
}
