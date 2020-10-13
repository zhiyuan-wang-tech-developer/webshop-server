import { Controller, Query } from "vesper";
import Group from "../../entity/group";
import GroupsService from "../../service/groups.service";

@Controller()
export class AdminGroupsController {
  constructor(private groupsService: GroupsService) {}

  // serve the query request "groups: [Group]"
  @Query()
  async groups() {
    const groups: Group[] = await this.groupsService.groupsManager.getGroups();
    return groups;
  }
}
