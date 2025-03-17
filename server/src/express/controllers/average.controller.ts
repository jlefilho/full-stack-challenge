import { Router, Request, Response, NextFunction } from "express";
import { AverageService } from "../services/average.service";

export class AverageController {
  static router(): Router {
    const router = Router({
      mergeParams: true,
      strict: true,
    });

    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new AverageService()
        .get()
        .then((result) => res.status(200).json(result))
        .catch(next);
    });

    return router;
  }
}
