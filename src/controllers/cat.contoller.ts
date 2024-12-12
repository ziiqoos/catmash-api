import { CatService } from '../services/cat.service';
import { connect } from '../config/db.mongodb';
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
        res.status(404).json({ message: 'Cat not found' });
      } else {
        res.status(200).json(cat);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllCats(req: Request, res: Response): Promise<void> {
    try {
      const { sort } = req.query;
      const sortOrder = sort === 'desc' ? -1 : sort === 'asc' ? 1 : undefined;

      const cats = await this.catService.getAllCats(sortOrder);
      res.status(200).json(cats);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCat(req: Request, res: Response): Promise<void> {
    try {
      const cat = await this.catService.createCat(req.body);
      res.status(201).json(cat);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCat(req: Request, res: Response): Promise<void> {
    try {
      const updatedCat = await this.catService.updateCat(req.params.id, req.body);
      if (!updatedCat) {
        res.status(404).json({ message: 'Cat not found' });
      } else {
        res.status(200).json(updatedCat);
      }
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async upvoteCat(req: Request, res: Response): Promise<void> {
    const { catId } = req.params;

    try {
      const updatedCat = await this.catService.upvoteCat(catId);

      res.status(200).json({ message: "Cat upvoted successfully", data: updatedCat });
    } catch (error:any) {
      if (error.message === "Cat not found") {
        res.status(404).json({ message: "Cat not found" });
      } else {
        console.error("Error upvoting the cat:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }

  }
}
