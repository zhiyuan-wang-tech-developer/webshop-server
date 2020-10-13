import { Service, Inject } from "typedi";
import {
  AUTHORITY_SERVICE,
  AUTHORITY_MANAGER,
} from "../constants/service.names";
import AuthorityManager from "../management/authority/manager";
import AuthorityManagerImpl from "../management/authority/manager.impl";

@Service(AUTHORITY_SERVICE)
export default class AuthorityService {
  public readonly authorityManager: AuthorityManager;
  constructor(
    @Inject(AUTHORITY_MANAGER)
    authorityManager: AuthorityManagerImpl
  ) {
    this.authorityManager = authorityManager;
  }
}
