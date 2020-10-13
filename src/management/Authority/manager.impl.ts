import { Repository, getRepository, DeleteResult } from "typeorm";
import { Service } from "typedi";
import { AuthorityAction } from "../../utils/custom.types";
import Authority from "../../entity/authority";
import Table from "../../entity/table";
import AuthorityManager from "./manager";
import { AUTHORITY_MANAGER } from "../../constants/service.names";

@Service(AUTHORITY_MANAGER)
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
    const { groupId, tableId, action } = authority;

    if (action === AuthorityAction.ALL) {
      // find all authorities when action is 'all'
      const authorities = await this.getAuthoritiesByGroupAndTable(
        groupId,
        tableId
      );
      // delete all authorities whose action is not 'all'
      if (authorities.length > 0) {
        authorities.forEach(async (authority) => {
          await this.authorityRepository.delete(authority.id!);
        });
      }
    }

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
