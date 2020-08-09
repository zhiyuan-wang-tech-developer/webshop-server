import InventoryItem from "../../entity/InventoryItem";

export default interface ItemManager {
  createItem(item: InventoryItem): Promise<InventoryItem>;

  getItemById(itemId: number): Promise<InventoryItem>;

  getItemsByStatus(status: string): Promise<InventoryItem[]>;

  getAllItems(): Promise<InventoryItem[]>;

  updateItem(
    itemId: number,
    item: Partial<InventoryItem>
  ): Promise<InventoryItem>;

  deleteItem(itemId: number): Promise<boolean>;
}
