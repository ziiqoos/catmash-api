import { CatRepository } from '../repositories/cat.repository.dynamodb';
import { ICat } from '../models/cat.model';

export class CatService {
  private catRepository: CatRepository;

  constructor() {
    this.catRepository = new CatRepository();
  }

  async getCatById(id: string): Promise<ICat | null> {
    return this.catRepository.getCatById(id);
  }

  async getAllCats(): Promise<ICat[]> {
    return this.catRepository.getAllCats();
  }

  async upvoteCat(catId: string): Promise<ICat | null> {
    const updatedCat = await this.catRepository.upvoteCatById(catId);

    if (!updatedCat) {
      throw new Error("Cat not found");
    }

    return updatedCat;
  }
}
