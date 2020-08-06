import { AuthorityActionType } from "../utils/CustomTypes";

export default interface AuthorityManager {
  getGroupByTableAndAction(
    tableId: number,
    action: AuthorityActionType
  ): Promise<number[]>;

  getAllActionsByGroupAndTable(
    groupId: number,
    tableId: number
  ): Promise<AuthorityActionType[]>;
}
