import { AuthorityAction } from "../../utils/custom.types";
import { Table } from "../../entity/table";
import { Authority } from "../../entity/authority";

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
