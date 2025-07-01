import { IShortenerRepository } from '../repositories/shortener';

export class ShortenerService {
  constructor(private readonly shortenerRepository: IShortenerRepository) {}

  async create() {
    return this.shortenerRepository.create({
      shortToken: Date.now().toString(),
      originalUrl: 'https://origurl.com'
    });
  }

  async getOne(shortToken: string) {
    return this.shortenerRepository.getOne(shortToken);
  }

  async getAll() {
    return this.shortenerRepository.getAll({ limit: 10, skip: 0 });
  }
}
