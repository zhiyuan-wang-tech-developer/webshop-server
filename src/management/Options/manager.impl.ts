import { DeleteResult } from "typeorm";
import { Service } from "typedi";
import Category from "../../entity/options/category";
import City from "../../entity/options/city";
import OptionsManager from "./manager";
import { OPTIONS_MANAGER } from "../../constants/service.names";

@Service(OPTIONS_MANAGER)
export default class OptionsManagerImpl implements OptionsManager {
  async getCities(): Promise<string[]> {
    const cities: City[] = await City.find();
    const allCitiesNames = cities.map((city: City) => city.name);
    return allCitiesNames;
  }

  async addCity(city: City): Promise<string> {
    const createdCity: City = await City.save(city);
    return createdCity.name;
  }

  async deleteCity(city: City): Promise<boolean> {
    const cityToDelete: City = await City.findOneOrFail({
      where: { name: city.name },
    });
    const result: DeleteResult = await City.delete(cityToDelete);
    if (result.affected === 1) {
      return true;
    }
    return false;
  }

  async getCategories(): Promise<string[]> {
    const categories: Category[] = await Category.find();
    const allCategoriesNames: string[] = categories.map(
      (category: Category) => category.name
    );
    return allCategoriesNames;
  }

  async addCategory(category: Category): Promise<string> {
    const createdCategory: Category = await Category.save(category);
    return createdCategory.name;
  }

  async deleteCategory(category: Category): Promise<boolean> {
    const categoryToDelete: Category = await Category.findOneOrFail({
      where: { name: category.name },
    });
    const result: DeleteResult = await Category.delete(categoryToDelete);
    if (result.affected === 1) {
      return true;
    }
    return false;
  }
}
