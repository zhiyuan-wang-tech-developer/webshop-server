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

export enum UserGroupType {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CLIENT = "CLIENT",
}

export enum AuthorityActionType {
  GET = "get",
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete",
}
