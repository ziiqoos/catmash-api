import CatModel, { ICat } from '../models/cat.model';

export class CatRepository {

  async getCatById(id: string): Promise<ICat | null> {
    return await CatModel.findOne({ id }).exec();
  }

  async getAllCats(sortOrder?: 1 | -1): Promise<ICat[]> {
    const query = CatModel.find();
    if (sortOrder !== undefined) {
      query.sort({ score: sortOrder });
    }
    return query.exec();
  }

  async createCat(catData: Partial<ICat>): Promise<ICat> {
    const cat = new CatModel(catData);
    return await cat.save();
  }

  async updateCat(id: string, updates: Partial<ICat>): Promise<ICat | null> {
    return await CatModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async upvoteCatById(catId: string): Promise<ICat | null> {
    return CatModel.findOneAndUpdate(
      { id: catId },
      { $inc: { score: 1 } },
      { new: true }
    );
  }

}
