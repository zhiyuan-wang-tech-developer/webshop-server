import { AuthorityAction } from "../../utils/CustomTypes";
import { Table } from "../../entity/Tables";
import { Authority } from "../../entity/Authorities";

export default interface AuthorityManager {
  getGroupsByTableAndAction(
    tableId: number,
    action: AuthorityAction
  ): Promise<number[]>;

  getActionsByGroupAndTable(
    groupId: number,
    tableId: number
  ): Promise<AuthorityAction[]>;

  getAuthoritiesByGroupAndTable(
    groupId: number,
    tableId: number
  ): Promise<Authority[]>;

  getTables(): Promise<Table[]>;

  createAuthority(authority: Authority): Promise<Authority>;

  deleteAuthority(authority: Authority): Promise<boolean>;
}
