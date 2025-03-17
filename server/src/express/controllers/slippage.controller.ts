import { Router, Request, Response, NextFunction } from "express";
import { SlippageService } from "../services/slippage.service";

export class SlippageController {
  static router(): Router {
    const router = Router({
      mergeParams: true,
      strict: true,
    });

    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new SlippageService()
        .listAll()
        .then((result) => res.status(200).json(result))
        .catch(next);
    });

    return router;
  }
}
