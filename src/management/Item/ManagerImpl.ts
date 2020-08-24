import { getRepository, Repository, DeleteResult } from "typeorm";
import InventoryItem from "../../entity/InventoryItem";
import ItemManager from "./Manager";
import { NotFoundError } from "routing-controllers";

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

  async getItemsByMultipleFactors(
    factors: any
  ): Promise<{ items: InventoryItem[]; count: number }> {
    const {
      category,
      status,
      minPrice,
      maxPrice,
      minQuantityInStock,
      maxQuantityInStock,
      name,
      description,
      id,
      offset,
      limit,
    } = factors;

    const queryCondition: string =
      "(item.category = :category OR :categoryIsNull)" +
      "AND (item.status = :status OR :statusIsNull)" +
      "AND (item.price >= :minPrice OR :minPriceIsNull)" +
      "AND (item.price <= :maxPrice OR :maxPriceIsNull)" +
      "AND (item.quantityInStock >= :minQuantityInStock OR :minQuantityInStockIsNull)" +
      "AND (item.quantityInStock <= :maxQuantityInStock OR :maxQuantityInStockIsNull)" +
      "AND (item.name = :name OR :nameIsNull)" +
      "AND (item.description LIKE :description OR :descriptionIsNull)" +
      "AND (item.id = :id OR :idIsNull)";

    // Set the number of results to skip, for security we impose skip <= 1000
    const skip = Math.min(offset || 0, 1000);
    // Set the number of results to take, for security we impose take <= 50
    const take = Math.min(limit || 10, 50);

    const [items, count] = await this.inventoryItemRepository
      .createQueryBuilder("item")
      .where(queryCondition, {
        category,
        categoryIsNull: category == null,
        status,
        statusIsNull: status == null,
        minPrice,
        minPriceIsNull: minPrice == null,
        maxPrice,
        maxPriceIsNull: maxPrice == null,
        minQuantityInStock,
        minQuantityInStockIsNull: minQuantityInStock == null,
        maxQuantityInStock,
        maxQuantityInStockIsNull: maxQuantityInStock == null,
        name,
        nameIsNull: name == null,
        description: "%" + description + "%",
        descriptionIsNull: description == null,
        id,
        idIsNull: id == null,
      })
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      items,
      count,
    };
  }

  async updateItem(
    itemId: number,
    item: Partial<InventoryItem>
  ): Promise<InventoryItem> {
    const itemToUpdate: InventoryItem = await this.getItemById(itemId);

    console.log(itemId);
    // if (item.itemDetail) {
    //   Object.assign(itemToUpdate.itemDetail, item.itemDetail);
    //   // To avoid to create new item detail to conflict with existent item detail in following "assign" function.
    //   delete item.itemDetail;
    // }
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
