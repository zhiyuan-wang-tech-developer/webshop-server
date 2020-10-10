import { JsonController, Body, Get, Post, Delete } from "routing-controllers";
import OptionsManager from "../management/options/manager";
import OptionsManagerImpl from "../management/options/manager.impl";
import Category from "../entity/options/category";
import City from "../entity/options/city";

@JsonController("/options")
export class OptionsController {
  private optionsManager: OptionsManager;

  constructor() {
    this.optionsManager = new OptionsManagerImpl();
  }

  @Get("/city")
  async getCities() {
    const cities: string[] = await this.optionsManager.getCities();
    return { cities };
  }

  @Post("/city")
  async addCity(@Body() city: City) {
    const createdCity: string = await this.optionsManager.addCity(city);
    return { createdCity };
  }

  @Delete("/city")
  async deleteCity(@Body() city: City) {
    const cityIsDeleted: boolean = await this.optionsManager.deleteCity(city);
    return { cityIsDeleted };
  }

  @Get("/category")
  async getCategories() {
    const categories: string[] = await this.optionsManager.getCategories();
    return { categories };
  }

  @Post("/category")
  async addCategory(@Body() category: Category) {
    const createdCategory: string = await this.optionsManager.addCategory(
      category
    );
    return { createdCategory };
  }

  @Delete("/category")
  async deleteCategory(@Body() category: Category) {
    const categoryIsDeleted: boolean = await this.optionsManager.deleteCategory(
      category
    );
    return { categoryIsDeleted };
  }
}
