import AuthorityManager from "./Manager";
import { Repository, getRepository, DeleteResult } from "typeorm";
import { AuthorityAction } from "../../utils/CustomTypes";
import { Authority } from "../../entity/Authorities";
import { Table } from "../../entity/Tables";

export default class AuthorityManagerImpl implements AuthorityManager {
  private authorityRepository: Repository<Authority>;

  constructor() {
    this.authorityRepository = getRepository(Authority);
  }

  async getGroupsByTableAndAction(
    tableId: number,
    action: AuthorityAction
  ): Promise<number[]> {
    const authorities: Authority[] = await this.authorityRepository.find({
      where: { tableId, action },
    });
    const groupIds: number[] = authorities.map(
      (authority: Authority) => authority.groupId
    );
    return groupIds;
  }

  async getActionsByGroupAndTable(
    groupId: number,
    tableId: number
  ): Promise<AuthorityAction[]> {
    const authorities: Authority[] = await this.authorityRepository.find({
      where: { groupId, tableId },
    });
    const actions: AuthorityAction[] = authorities.map(
      (authority: Authority) => authority.action
    );
    return actions;
  }

  async getAuthoritiesByGroupAndTable(
    groupId: number,
    tableId: number
  ): Promise<Authority[]> {
    const authorities: Authority[] = await this.authorityRepository.find({
      where: { groupId, tableId },
    });
    return authorities;
  }

  async getTables(): Promise<Table[]> {
    const tables: Table[] = await Table.find();
    return tables;
  }

  async createAuthority(authority: Authority): Promise<Authority> {
    const createdAuthority: Authority = await this.authorityRepository.save(
      authority
    );
    return createdAuthority;
  }

  async deleteAuthority(authority: Authority): Promise<boolean> {
    const authorityToDelete: Authority = await this.authorityRepository.findOneOrFail(
      {
        where: { ...authority },
      }
    );

    if (!authorityToDelete.id) {
      return false;
    }

    const result: DeleteResult = await this.authorityRepository.delete(
      authorityToDelete.id
    );

    return result.affected && result.affected === 1 ? true : false;
  }
}
