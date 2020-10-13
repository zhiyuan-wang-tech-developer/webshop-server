import { JsonController, Body, Get, Post, Delete } from "routing-controllers";
import Category from "../entity/options/category";
import City from "../entity/options/city";
import OptionsService from "../service/options.service";

@JsonController("/options")
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Get("/city")
  async getCities() {
    const cities: string[] = await this.optionsService.optionsManager.getCities();
    return { cities };
  }

  @Post("/city")
  async addCity(@Body() city: City) {
    const createdCity: string = await this.optionsService.optionsManager.addCity(
      city
    );
    return { createdCity };
  }

  @Delete("/city")
  async deleteCity(@Body() city: City) {
    const cityIsDeleted: boolean = await this.optionsService.optionsManager.deleteCity(
      city
    );
    return { cityIsDeleted };
  }

  @Get("/category")
  async getCategories() {
    const categories: string[] = await this.optionsService.optionsManager.getCategories();
    return { categories };
  }

  @Post("/category")
  async addCategory(@Body() category: Category) {
    const createdCategory: string = await this.optionsService.optionsManager.addCategory(
      category
    );
    return { createdCategory };
  }

  @Delete("/category")
  async deleteCategory(@Body() category: Category) {
    const categoryIsDeleted: boolean = await this.optionsService.optionsManager.deleteCategory(
      category
    );
    return { categoryIsDeleted };
  }
}
