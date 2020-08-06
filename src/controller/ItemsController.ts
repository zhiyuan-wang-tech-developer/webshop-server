import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
} from "routing-controllers";
import InventoryItem from "../entity/InventoryItem";
import ItemManager from "../management/ItemManager";
import ItemManagerImpl from "../management/ItemManagerImpl";

@JsonController("/items")
export class ItemsController {
  private itemManager: ItemManager;

  constructor() {
    this.itemManager = new ItemManagerImpl();
  }

  @Get()
  async getItems() {
    console.log("This action returns all items");
    const items = await this.itemManager.getAllItems();
    return { items };
  }

  @Get("/:id")
  async getItemById(@Param("id") id: number) {
    console.log(`This action returns item #${id}`);
    const item = await this.itemManager.getItemById(id);
    return { item };
  }

  @Get("/status/:status")
  async getItemsByStatus(@Param("status") status: string) {
    console.log(status);
    const items = await this.itemManager.getItemsByStatus(status);
    return { items };
  }

  @Post()
  @HttpCode(201) // Set the default HTTP response code 201 Created
  async createItem(@Body() item: InventoryItem) {
    console.log(`Creating item: ${JSON.stringify(item)}`);
    const createdItem: InventoryItem = await this.itemManager.createItem(item);
    return { createdItem };
  }

  @Put("/:id")
  async updateItem(
    @Param("id") id: number,
    @Body() item: Partial<InventoryItem>
  ) {
    console.log(`Updating item #${id} ${JSON.stringify(item)}`);
    const updatedItem: InventoryItem = await this.itemManager.updateItem(
      id,
      item
    );
    return { updatedItem };
  }

  @Delete("/:id")
  async deleteItem(@Param("id") id: number) {
    console.log(`Deleting item #${id}`);
    // TODO: Check cart item constraint
    const itemIsDeleted: boolean = await this.itemManager.deleteItem(id);
    return { itemIsDeleted };
  }
}
