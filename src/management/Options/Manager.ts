import City from "../../entity/options/Cities";
import Category from "../../entity/options/Categories";

export default interface OptionsManager {
  getCities(): Promise<string[]>;
  addCity(city: City): Promise<string>;
  deleteCity(city: City): Promise<boolean>;

  getCategories(): Promise<string[]>;
  addCategory(category: Category): Promise<string>;
  deleteCategory(category: Category): Promise<boolean>;
}
