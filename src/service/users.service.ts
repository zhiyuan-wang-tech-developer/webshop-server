import { Service, Inject } from "typedi";
import { USERS_SERVICE, USERS_MANAGER } from "../constants/service.names";
import UsersManager from "../management/users/manager";
import UsersManagerImpl from "../management/users/manager.impl";

@Service(USERS_SERVICE)
export default class UsersService {
  public readonly usersManager: UsersManager;
  constructor(@Inject(USERS_MANAGER) usersManager: UsersManagerImpl) {
    this.usersManager = usersManager;
  }
}
