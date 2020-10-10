import InventoryItem from "../../entity/inventory.item";

export const ITEMS_MANAGER: string = "items.manager";

export default interface ItemsManager {
  createItem(item: InventoryItem): Promise<InventoryItem>;

  getItemById(itemId: number): Promise<InventoryItem>;

  getItemsByStatus(status: string): Promise<InventoryItem[]>;

  getItemsByMultipleFactors(
    factors: any
  ): Promise<{
    itemsTotal: number;
    pageItems: InventoryItem[];
    pageCurrent: number;
    pageTotal: number;
  }>;

  getPageItems(
    factors: any
  ): Promise<{
    itemsTotal: number;
    pageItems: InventoryItem[];
    pageCurrent: number;
    pageTotal: number;
  }>;

  getAllItems(): Promise<InventoryItem[]>;

  updateItem(
    itemId: number,
    item: Partial<InventoryItem>
  ): Promise<InventoryItem>;

  deleteItem(itemId: number): Promise<boolean>;
}
