import { Group } from "../entity/Groups";

export default interface GroupManager {
  getGroups(): Promise<Group[]>;
  getGroupById(groupId: number): Promise<Group>;

  createGroup(group: Group): Promise<Group>;

  updateGroup(groupId: number, group: Partial<Group>): Promise<Group>;

  deleteGroup(groupId: number): Promise<boolean>;
}
