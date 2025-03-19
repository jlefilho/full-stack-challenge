import { Router, Request, Response } from "express";
import { AverageService } from "../services/average.service";

export class AverageController {
  static router(): Router {
    const router = Router({
      mergeParams: true,
      strict: true,
    });

    router.get("/", (req: Request, res: Response) => {
      new AverageService()
        .get()
        .then((result) => res.status(200).json(result))
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    });

    return router;
  }
}
