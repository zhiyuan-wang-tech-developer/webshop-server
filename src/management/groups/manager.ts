import Group from "../../entity/group";

export default interface GroupsManager {
  getGroups(): Promise<Group[]>;

  getGroupById(groupId: number): Promise<Group>;

  createGroup(group: Group): Promise<Group>;

  updateGroup(groupId: number, group: Partial<Group>): Promise<Group>;

  deleteGroup(groupId: number): Promise<boolean>;
}
