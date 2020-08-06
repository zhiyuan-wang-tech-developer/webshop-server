import AuthorityManager from "./AuthorityManager";
import { Repository, getRepository } from "typeorm";
import { AuthorityActionType } from "../utils/CustomTypes";
import { Authority } from "../entity/Authorities";

export default class AuthorityManagerImpl implements AuthorityManager {
  private authorityRepository: Repository<Authority>;

  constructor() {
    this.authorityRepository = getRepository(Authority);
  }

  async getGroupByTableAndAction(
    tableId: number,
    action: AuthorityActionType
  ): Promise<number[]> {
    const authorities: Authority[] = await this.authorityRepository.find({
      where: { tableId, action },
    });
    const groupIds: number[] = authorities.map(
      (authority: Authority) => authority.groupId
    );
    return groupIds;
  }

  async getAllActionsByGroupAndTable(
    groupId: number,
    tableId: number
  ): Promise<AuthorityActionType[]> {
    const authorities: Authority[] = await this.authorityRepository.find({
      where: { groupId, tableId },
    });
    const actions: AuthorityActionType[] = authorities.map(
      (authority: Authority) => authority.action
    );
    return actions;
  }
}
