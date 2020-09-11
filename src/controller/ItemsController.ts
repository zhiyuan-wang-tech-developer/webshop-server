import {
  JsonController,
  Param,
  QueryParams,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
} from "routing-controllers";
import InventoryItem from "../entity/InventoryItem";
import ItemManager from "../management/Item/Manager";
import ItemManagerImpl from "../management/Item/ManagerImpl";

@JsonController("/items")
export class ItemsController {
  private itemManager: ItemManager;

  constructor() {
    this.itemManager = new ItemManagerImpl();
  }

  @Get()
  async getItems() {
    // console.log("This action returns all items");
    const items = await this.itemManager.getAllItems();
    return { items };
  }

  @Get("/id/:id")
  async getItemById(@Param("id") id: number) {
    const item = await this.itemManager.getItemById(id);
    return { item };
  }

  @Get("/find")
  async getItemsByQuery(@QueryParams() params: any) {
    const {
      itemsTotal,
      pageItems,
      pageCurrent,
      pageTotal,
    } = await this.itemManager.getItemsByMultipleFactors(params);
    return { itemsTotal, pageItems, pageCurrent, pageTotal };
  }

  @Post()
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createItem(@Body() item: InventoryItem) {
    const createdItem: InventoryItem = await this.itemManager.createItem(item);
    return { createdItem };
  }

  @Put("/:id")
  async updateItem(
    @Param("id") id: number,
    @Body() item: Partial<InventoryItem>
  ) {
    const updatedItem: InventoryItem = await this.itemManager.updateItem(
      id,
      item
    );
    return { updatedItem };
  }

  @Delete("/:id")
  async deleteItem(@Param("id") id: number) {
    // TODO: Check cart item constraint
    const itemIsDeleted: boolean = await this.itemManager.deleteItem(id);
    return { itemIsDeleted };
  }
}
