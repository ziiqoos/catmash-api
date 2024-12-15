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

  async upvoteCat(catId: string): Promise<ICat | null> {
    const updatedCat = await this.catRepository.upvoteCatById(catId);

    if (!updatedCat) {
      throw new Error("Cat not found");
    }

    return updatedCat;
  }
}
