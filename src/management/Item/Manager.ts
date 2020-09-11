import InventoryItem from "../../entity/InventoryItem";

export default interface ItemManager {
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

  getAllItems(): Promise<InventoryItem[]>;

  updateItem(
    itemId: number,
    item: Partial<InventoryItem>
  ): Promise<InventoryItem>;

  deleteItem(itemId: number): Promise<boolean>;
}
