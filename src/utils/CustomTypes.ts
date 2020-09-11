export enum CartItemStatus {
  ORDERED = "ORDERED",
  PAID = "PAID",
  DELIVERED = "DELIVERED",
}

export enum InventoryItemStatus {
  FOR_SALE = "FOR SALE",
  SUMMER_SALE = "SUMMER SALE",
  WINTER_SALE = "WINTER SALE",
  OUT_OF_STOCK = "OUT OF STOCK",
}

export enum InventoryItemCategory {
  BOOKS = "Books",
  ELECTRONICS = "Electronics",
  TRANSPORTS = "Transports",
  OTHERS = "Others",
}

export enum UserGroup {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
}

export enum AuthorityAction {
  ALL = "all",
  GET = "get",
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}

export type TableAction = {
  tableId: number;
  tableName: string;
  actions: AuthorityAction[];
};
