import { ShortenerService } from '../services/shortener';

export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  async create() {
    try {
      const createdItem = await this.shortenerService.create();
      return createdItem;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getOne() {}

  async getAll() {
    try {
      const foundItems = await this.shortenerService.getAll();
      return foundItems;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  delete() {}

  update() {}
}
