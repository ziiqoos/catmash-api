import { CatService } from '../services/cat.service';
import { connect } from '../config/db.mongodb';
import { logger } from '../utils/logger';
import { Request, Response } from 'express';
export class CatController {
  private catService: CatService;

  constructor() {
    connect();
    this.catService = new CatService();
  }


  async getCatById(req: Request, res: Response): Promise<void> {
    try {
      const cat = await this.catService.getCatById(req.params.id);
      if (!cat) {
        logger.httpError('GET', `/api/cats/${req.params.id}`, 'N/A', 404, 'Entity not found');
        res.status(404).json({ message: 'Cat not found' });
      } else {
        logger.httpInfo('GET', `/api/cats/${req.params.id}`, 'N/A', 200);
        res.status(200).json(cat);
      }
    } catch (err) {
      const error = err as Error;
      logger.httpError('GET', `/api/cats/${req.params.id}`, 'N/A', 500, error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCats(req: Request, res: Response): Promise<void> {
    try {
      const { sort } = req.query;
      const sortOrder = sort === 'desc' ? -1 : sort === 'asc' ? 1 : undefined;

      const cats = await this.catService.getAllCats(sortOrder);
      logger.httpInfo('GET', `/api/cats`, 'N/A', 200);
      res.status(200).json(cats);
    } catch (err) {
      const error = err as Error;
      logger.httpInfo('GET', `/api/cats`, 'N/A', 500);
      res.status(500).json({ error: error.message });
    }
  }

  async upvoteCat(req: Request, res: Response): Promise<void> {
    const { catId } = req.params;

    try {
      const updatedCat = await this.catService.upvoteCat(catId);
      logger.httpInfo('PATCH', `/api/cats/${catId}`, 'N/A', 200);

      res.status(200).json({ message: "Cat upvoted successfully", data: updatedCat });
    } catch (err) {
      const error = err as Error;
      if (error.message === "Cat not found") {
        logger.httpError('PATCH', `/api/cats/${catId}`, 'N/A', 404, error.message);
        res.status(404).json({ message: "Cat not found" });
      } else {
        console.error("Error upvoting the cat:", error);
        logger.httpError('PATCH', `/api/cats/${catId}`, 'N/A', 500, error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }

  }
}
