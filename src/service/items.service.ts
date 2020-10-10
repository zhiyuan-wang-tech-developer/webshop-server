import { Service, Inject } from "typedi";
import ItemsManager, {
  ITEMS_MANAGER,
} from "../management/items/manager";

export const ITEMS_SERVICE: string = "items.service";

@Service(ITEMS_SERVICE)
export default class ItemsService {
  constructor(
    @Inject(ITEMS_MANAGER) readonly itemsManager: ItemsManager
  ) {}
}
