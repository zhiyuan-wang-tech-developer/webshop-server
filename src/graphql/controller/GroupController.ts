import { Controller, Query } from "vesper";
import { Group } from "../../entity/Groups";
import GroupManager from "../../management/Group/Manager";
import GroupManagerImpl from "../../management/Group/ManagerImpl";

@Controller()
export class GroupController {
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
