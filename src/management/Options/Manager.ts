import City from "../../entity/options/city";
import Category from "../../entity/options/category";

export default interface OptionsManager {
  getCities(): Promise<string[]>;
  addCity(city: City): Promise<string>;
  deleteCity(city: City): Promise<boolean>;

  getCategories(): Promise<string[]>;
  addCategory(category: Category): Promise<string>;
  deleteCategory(category: Category): Promise<boolean>;
}
