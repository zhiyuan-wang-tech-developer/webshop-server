import { Controller, Query } from "vesper";
import Group from "../../entity/group";
import GroupManager from "../../management/groups/manager";
import GroupManagerImpl from "../../management/groups/manager.impl";

@Controller()
export class AdminGroupsController {
  private groupManager: GroupManager;

  constructor() {
    this.groupManager = new GroupManagerImpl();
  }

  // serve the query request "groups: [Group]"
  @Query()
  async groups() {
    const groups: Group[] = await this.groupManager.getGroups();
    return groups;
  }
}
