import { Router, Request, Response, NextFunction } from "express";
import { QuoteService } from "../services/quote.service";

export class QuotesController {
  static router(): Router {
    const router = Router({
      mergeParams: true,
      strict: true,
    });

    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new QuoteService()
        .listAll()
        .then((result) => res.status(200).json(result))
        .catch(next);
    });

    return router;
  }
}
