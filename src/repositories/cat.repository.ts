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

  async upvoteCatById(catId: string): Promise<ICat | null> {
    return CatModel.findOneAndUpdate(
      { id: catId },
      { $inc: { score: 1 } },
      { new: true }
    );
  }

}
