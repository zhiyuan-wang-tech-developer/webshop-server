import { Service, Inject } from "typedi";
import {
  ADMIN_USERS_SERVICE,
  ADMIN_USERS_MANAGER,
} from "../constants/service.names";
import AdminUsersManager from "../management/admin.users/manager";
import AdminUsersManagerImpl from "../management/admin.users/manager.impl";

@Service(ADMIN_USERS_SERVICE)
export default class AdminUsersService {
  public readonly adminUsersManager: AdminUsersManager;
  constructor(
    @Inject(ADMIN_USERS_MANAGER)
    adminUsersManager: AdminUsersManagerImpl
  ) {
    this.adminUsersManager = adminUsersManager;
  }
}
