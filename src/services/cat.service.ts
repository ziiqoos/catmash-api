import { CatRepository } from '../repositories/cat.repository';
import { ICat } from '../models/cat.model';

export class CatService {
  private catRepository: CatRepository;

  constructor() {
    this.catRepository = new CatRepository();
  }

  async getCatById(id: string): Promise<ICat | null> {
    return this.catRepository.getCatById(id);
  }

  async getAllCats(sortOrder?: 1 | -1): Promise<ICat[]> {
    return this.catRepository.getAllCats(sortOrder);
  }

  async createCat(catData: Partial<ICat>): Promise<ICat> {
    return this.catRepository.createCat(catData);
  }

  async updateCat(id: string, updates: Partial<ICat>): Promise<ICat | null> {
    return this.catRepository.updateCat(id, updates);
  }

  async upvoteCat(catId: string): Promise<ICat | null> {
    const updatedCat = await this.catRepository.upvoteCatById(catId);

    if (!updatedCat) {
      throw new Error("Cat not found");
    }

    return updatedCat;
  }
}
