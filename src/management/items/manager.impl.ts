import { getRepository, Repository, DeleteResult } from "typeorm";
import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import buildPaginator from "pagination-apis";
import InventoryItem from "../../entity/inventory.item";
import ItemsManager from "./manager";
import { ITEMS_MANAGER } from "../../constants/service.names";

@Service(ITEMS_MANAGER)
export default class ItemsManagerImpl implements ItemsManager {
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

  // Page is known in advance.
  async getItemsByMultipleFactors(
    factors: any
  ): Promise<{
    itemsTotal: number;
    pageItems: InventoryItem[];
    pageCurrent: number;
    pageTotal: number;
  }> {
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
      limit,
      page,
      sortColumn,
      sortOrder,
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
    // const skip = Math.min(offset || 0, 1000);
    // Set the number of results to take, for security we impose take <= 50
    // const take = Math.min(limit || 10, 50);

    const {
      limit: pageLimit,
      skip: offset,
      page: pageNum,
      paginate,
    } = buildPaginator({
      page: page || 1,
      limit: limit || 5,
      maximumLimit: 10,
    });

    const sortColumnName = sortColumn ? `item.${sortColumn}` : "item.id";

    const [items, total] = await this.inventoryItemRepository
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
      .skip(offset)
      .take(pageLimit)
      .orderBy({
        [sortColumnName]: sortOrder || "ASC",
      })
      .getManyAndCount();

    const { totalPages } = paginate(items, total);

    return {
      itemsTotal: total,
      pageItems: items,
      pageCurrent: pageNum,
      pageTotal: totalPages,
    };
  }

  // Find the page where item is and return all items in that page.
  // Page is unknown.
  async getPageItems(
    factors: any
  ): Promise<{
    itemsTotal: number;
    pageItems: InventoryItem[];
    pageCurrent: number;
    pageTotal: number;
  }> {
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
      limit,
      sortColumn,
      sortOrder,
    } = factors;

    const queryCondition: string =
      "(item.category = :category OR :categoryIsNull)" +
      "AND (item.status = :status OR :statusIsNull)" +
      "AND (item.price >= :minPrice OR :minPriceIsNull)" +
      "AND (item.price <= :maxPrice OR :maxPriceIsNull)" +
      "AND (item.quantityInStock >= :minQuantityInStock OR :minQuantityInStockIsNull)" +
      "AND (item.quantityInStock <= :maxQuantityInStock OR :maxQuantityInStockIsNull)" +
      "AND (item.name = :name OR :nameIsNull)" +
      "AND (item.description LIKE :description OR :descriptionIsNull)";

    const sortColumnName = sortColumn ? `item.${sortColumn}` : "item.id";

    const [items, total] = await this.inventoryItemRepository
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
      })
      .orderBy({
        [sortColumnName]: sortOrder || "ASC",
      })
      .getManyAndCount();

    const itemIndex = items.findIndex((item) => item.id == id);

    const pageLimit = limit && limit > 0 ? parseInt(limit) : 5;

    let itemPage = 1;

    if (itemIndex >= 0) {
      itemPage = Math.ceil((itemIndex + 1) / pageLimit);
    }

    let pageItems = items.slice(
      (itemPage - 1) * pageLimit,
      itemPage * pageLimit
    );

    const { page: pageNum, paginate } = buildPaginator({
      page: itemPage,
      limit: pageLimit,
      maximumLimit: 10,
    });

    const { totalPages } = paginate(pageItems, total);

    return {
      itemsTotal: total,
      pageItems,
      pageCurrent: pageNum,
      pageTotal: totalPages,
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
