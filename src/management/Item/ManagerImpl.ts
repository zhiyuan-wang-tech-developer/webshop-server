import { getRepository, Repository, DeleteResult } from "typeorm";
import InventoryItem from "../../entity/InventoryItem";
import ItemManager from "./Manager";
import { NotFoundError } from "routing-controllers";
import { QueryPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export default class ItemManagerImpl implements ItemManager {
  // Use data mapper pattern for maintainability
  private inventoryItemRepository: Repository<InventoryItem>;

  constructor() {
    this.inventoryItemRepository = getRepository(InventoryItem);
  }

  async createItem(item: InventoryItem): Promise<InventoryItem> {
    const newItem: InventoryItem = await this.inventoryItemRepository.save(
      item
    );
    return newItem;
  }

  async getItemById(itemId: number): Promise<InventoryItem> {
    try {
      const inventoryItem: InventoryItem = await this.inventoryItemRepository.findOneOrFail(
        itemId
      );
      return inventoryItem;
    } catch (error) {
      throw new NotFoundError(
        `Inventory Item with id ${itemId} not found! ${error}`
      );
    }
  }

  async getAllItems(): Promise<InventoryItem[]> {
    const items: InventoryItem[] = await this.inventoryItemRepository.find();
    return items;
  }

  async getItemsByStatus(status: string): Promise<InventoryItem[]> {
    const items: InventoryItem[] = await this.inventoryItemRepository.find({
      where: { status },
    });
    return items;
  }

  // TODO: finish the get items by multiple factors
  async getItemsByFactors(factors: QueryPartialEntity<InventoryItem>) {
    const items = this.inventoryItemRepository.find({
      where: {
        name: factors.name,
        category: factors.category,
        status: factors.status,
        quantityInStock: factors.quantityInStock,
      },
    });
  }

  async updateItem(
    itemId: number,
    item: Partial<InventoryItem>
  ): Promise<InventoryItem> {
    const itemToUpdate: InventoryItem = await this.getItemById(itemId);
    if (item.itemDetail) {
      Object.assign(itemToUpdate.itemDetail, item.itemDetail);
      // To avoid to create new item detail to conflict with existent item detail in following "assign" function.
      delete item.itemDetail;
    }
    Object.assign(itemToUpdate, item);
    return await itemToUpdate.save();
  }

  async deleteItem(itemId: number): Promise<boolean> {
    const inventoryItem: InventoryItem = await this.inventoryItemRepository.findOneOrFail(
      itemId
    );
    if (inventoryItem.itemDetail) {
      await inventoryItem.itemDetail.remove();
    }
    const result: DeleteResult = await this.inventoryItemRepository.delete(
      itemId
    );
    // console.log(`Delete result: ${JSON.stringify(result)}`);
    if (result.affected && result.affected === 1) {
      return true;
    } else {
      throw new Error(`Inventory Item with id ${itemId} not deleted!`);
    }
  }
}
