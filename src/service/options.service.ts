import { Service, Inject } from "typedi";
import { OPTIONS_SERVICE, OPTIONS_MANAGER } from "../constants/service.names";
import OptionsManager from "../management/options/manager";
import OptionsManagerImpl from "../management/options/manager.impl";

@Service(OPTIONS_SERVICE)
export default class OptionsService {
  public readonly optionsManager: OptionsManager;
  constructor(@Inject(OPTIONS_MANAGER) optionsManager: OptionsManagerImpl) {
    this.optionsManager = optionsManager;
  }
}
