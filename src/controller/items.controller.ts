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
import InventoryItem from "../entity/inventory.item";
import ItemsService from "../service/items.service";

@JsonController("/items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItems() {
    // console.log("This action returns all items");
    const items = await this.itemsService.itemsManager.getAllItems();
    return { items };
  }

  @Get("/id/:id")
  async getItemById(@Param("id") id: number) {
    const item = await this.itemsService.itemsManager.getItemById(id);
    return { item };
  }

  @Get("/find")
  async getItemsByQuery(@QueryParams() params: any) {
    const {
      itemsTotal,
      pageItems,
      pageCurrent,
      pageTotal,
    } = await this.itemsService.itemsManager.getItemsByMultipleFactors(params);
    return { itemsTotal, pageItems, pageCurrent, pageTotal };
  }

  @Get("/find/page")
  async getPageItemsByQuery(@QueryParams() params: any) {
    const {
      itemsTotal,
      pageItems,
      pageCurrent,
      pageTotal,
    } = await this.itemsService.itemsManager.getPageItems(params);
    return { itemsTotal, pageItems, pageCurrent, pageTotal };
  }

  @Post()
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createItem(@Body() item: InventoryItem) {
    const createdItem: InventoryItem = await this.itemsService.itemsManager.createItem(
      item
    );
    return { createdItem };
  }

  @Put("/:id")
  async updateItem(
    @Param("id") id: number,
    @Body() item: Partial<InventoryItem>
  ) {
    const updatedItem: InventoryItem = await this.itemsService.itemsManager.updateItem(
      id,
      item
    );
    return { updatedItem };
  }

  @Delete("/:id")
  async deleteItem(@Param("id") id: number) {
    // TODO: Check cart item constraint
    const itemIsDeleted: boolean = await this.itemsService.itemsManager.deleteItem(
      id
    );
    return { itemIsDeleted };
  }
}
