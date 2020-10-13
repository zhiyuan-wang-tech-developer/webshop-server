import { Service, Inject } from "typedi";
import { GROUPS_SERVICE, GROUPS_MANAGER } from "../constants/service.names";
import GroupsManager from "../management/groups/manager";
import GroupsManagerImpl from "../management/groups/manager.impl";

@Service(GROUPS_SERVICE)
export default class GroupsService {
  public readonly groupsManager: GroupsManager;
  constructor(@Inject(GROUPS_MANAGER) groupsManager: GroupsManagerImpl) {
    this.groupsManager = groupsManager;
  }
}
