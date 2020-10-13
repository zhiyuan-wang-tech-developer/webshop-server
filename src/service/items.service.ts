import { Service, Inject } from "typedi";
import { ITEMS_SERVICE, ITEMS_MANAGER } from "../constants/service.names";
import ItemsManager from "../management/items/manager";
import ItemsManagerImpl from "../management/items/manager.impl";

@Service(ITEMS_SERVICE)
export default class ItemsService {
  public readonly itemsManager: ItemsManager;
  constructor(@Inject(ITEMS_MANAGER) itemsManager: ItemsManagerImpl) {
    this.itemsManager = itemsManager;
  }
}
