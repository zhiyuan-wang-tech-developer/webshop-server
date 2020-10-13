import { Service } from "typedi";
import { Repository, DeleteResult, getRepository } from "typeorm";
import { NotFoundError } from "routing-controllers";
import Group from "../../entity/group";
import GroupsManager from "./manager";
import { GROUPS_MANAGER } from "../../constants/service.names";

@Service(GROUPS_MANAGER)
export default class GroupsManagerImpl implements GroupsManager {
  private groupRepository: Repository<Group>;

  constructor() {
    this.groupRepository = getRepository(Group);
  }

  async getGroups(): Promise<Group[]> {
    const groups: Group[] = await this.groupRepository.find();
    return groups;
  }

  async getGroupById(groupId: number): Promise<Group> {
    try {
      const group: Group = await this.groupRepository.findOneOrFail(groupId);
      return group;
    } catch (error) {
      throw new NotFoundError(`Group with id ${groupId} not found! ${error}`);
    }
  }

  async createGroup(group: Group): Promise<Group> {
    const newGroup: Group = await this.groupRepository.save(group);
    return newGroup;
  }

  async updateGroup(groupId: number, group: Partial<Group>): Promise<Group> {
    const groupToUpdate: Group = await this.getGroupById(groupId);
    Object.assign(groupToUpdate, group);
    return await this.groupRepository.save(groupToUpdate);
  }

  async deleteGroup(groupId: number): Promise<boolean> {
    const result: DeleteResult = await this.groupRepository.delete(groupId);
    if (result.affected && result.affected === 1) {
      return true;
    } else {
      throw new Error(`Group with id ${groupId} not deleted!`);
    }
  }
}
